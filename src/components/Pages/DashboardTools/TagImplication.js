import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getListOfImps, addImp, deleteImp } from '../../../redux/generalReducer';
import './TagImplication.css';
import './TagAlias.css';

class TagImplication extends Component 
{
  constructor()
  {
    super();
    this.state =
    {
      predicateInput: '',
      impliesInput: ''
    };
    this.handleNewImpButtonFn = this.handleNewImpButtonFn.bind(this);
  }

  handleNewImpButtonFn()
  {
    let usedPredicates = this.props.impObj.map(e => e.predicate);
    // For the input to be considered, the first term cannot be a duplicate and both terms must not be NULL
    if(this.state.predicateInput.trim() == '' || this.state.impliesInput.trim() == '')
    {
      console.log('Empty inputs cannot be accepted as implications. Enter two terms and try again');
    }
    else
    {
      this.props.addImp({
        predicate: this.state.predicateInput.trim().toLowerCase(), 
        implies: this.state.impliesInput.trim().toLowerCase()});
      this.setState({predicateInput: '', impliesInput: ''});
    }
  }

  componentDidMount()
  {
    this.props.getListOfImps();
  }
  
  render() { 
    let impList = [];
    this.props.impObj ?
    impList = this.props.impObj.slice(0).reverse().map((e,i) => {
      return (
        <tr key={'aliasInputBlock' + i}>
          <td className="alias-table-cell">{e.predicate.replace(/[_]/g, ' ')}</td>
          <td className="alias-table-cell"> -> </td>
          <td className="alias-table-cell">{e.implies.replace(/[_]/g, ' ')}</td>
          <td className="alias-table-cell">
          <button onClick={async () => {
            await this.props.deleteImp(e.imp_id);
            this.props.getListOfImps();
            }}>x
          </button></td>
        </tr>
      );
    })
    : null;

    return (
      <div className="alias-table">
        <h3>Tag Implications</h3>
        <table>
          <thead>
            <tr>
            <td><input onChange={(e) => this.setState({predicateInput: e.target.value})} value={this.state.predicateInput} placeholder='Trait'/></td>
            <td className="alias-table-cell"> -> </td>
            <td><input onChange={(e) => this.setState({impliesInput: e.target.value})} value={this.state.impliesInput} placeholder='Parent Trait'/></td>
            <td className="alias-table-cell">
              <button onClick={() => this.handleNewImpButtonFn()}>Add</button>
            </td>
            </tr>
          </thead>
          <tbody>
            {impList}
          </tbody>
        </table>
      </div>
    ); //return
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getListOfImps, addImp, deleteImp })(TagImplication);