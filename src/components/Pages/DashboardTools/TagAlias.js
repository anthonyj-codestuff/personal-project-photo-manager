import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover, Button } from 'antd';

import { getListOfAliases, addAlias, deleteAlias } from '../../../redux/generalReducer';
import './TagAlias.css';

class TagAlias extends Component 
{
  constructor()
  {
    super();
    this.state =
    {
      oldNameInput: '',
      newNameInput: ''
    };
    this.handleNewAliasButtonFn = this.handleNewAliasButtonFn.bind(this);
  }

  handleNewAliasButtonFn()
  {
    let usedOldTerms = this.props.aliasObj.map(e => e.old_name);
    // For the input to be considered, the first term cannot be a duplicate and both terms must not be NULL
    if(this.state.oldNameInput.trim() == '' || this.state.newNameInput.trim() == '')
    {
      console.log('Empty inputs cannot be accepted as aliases. Enter two terms and try again');
    }
    else if(usedOldTerms.includes(this.state.oldNameInput.trim().toLowerCase()))
    {
      //display tooltip and maybe flash the alias box red
      console.log('You cannot reuse the first term of an alias. Delete that alias and try again');
    }
    else
    {
      this.props.addAlias({
        oldname: this.state.oldNameInput.trim().toLowerCase().replace(/[\s]/g, '_'), 
        newname: this.state.newNameInput.trim().toLowerCase().replace(/[\s]/g, '_')});
      this.setState({oldNameInput: '', newNameInput: ''});
    }
  }

  componentDidMount()
  {
    this.props.getListOfAliases();
  }
  
  render() { 
    const content = (
      <div className='dashboard-tooltip'>
        <span>Any tags found in the left column will be changed to their parner in the right column before they are added to the database. If the user defines 'outside = outdoors', then all new instances of 'outside' will be changed</span>
      </div>
    );

    let aliasList = [];
    this.props.aliasObj ?
    aliasList = this.props.aliasObj.slice(0).reverse().map((e,i) => {
      return (
        <tr key={'aliasInputBlock' + i}>
          <td className="alias-table-cell">{e.old_name.replace(/[_]/g, ' ')}</td>
          <td className="alias-table-cell"> = </td>
          <td className="alias-table-cell">{e.new_name.replace(/[_]/g, ' ')}</td>
          <td className="alias-table-cell">
            <button onClick={async () => {
              await this.props.deleteAlias(e.alias_id);
              this.props.getListOfAliases();
              }}>x
            </button>
          </td>
        </tr>
      );
    })
    : null;

    return (
      <div className="alias-table">
        <div className='flex-row flex-center-x flex-center-y'>
          <h3>Tag Aliases</h3>
          <Popover content={content} title="Tag Aliasing" trigger="click">
            <p style={{'color':'#5555FF', 'textDecoration':'underline'}}> Help?</p>
          </Popover>
        </div>
        <table>
          <thead>
            <tr>
            <td><input onChange={(e) => this.setState({oldNameInput: e.target.value})} value={this.state.oldNameInput} placeholder='Old Name'/></td>
            <td className="alias-table-cell"> = </td>
            <td><input onChange={(e) => this.setState({newNameInput: e.target.value})} value={this.state.newNameInput} placeholder='New Name'/></td>
            <td className="alias-table-cell">
              <button onClick={() => this.handleNewAliasButtonFn()}>Add</button>
            </td>
            </tr>
          </thead>
          <tbody>
            {aliasList}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getListOfAliases, addAlias, deleteAlias })(TagAlias);