import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getListOfAliases } from '../../../redux/generalReducer';
import './TagAlias.css';

class TagAlias extends Component 
{
  constructor()
  {
    super();
    this.state =
    {
      aliasObj: []
    };
  }

  componentDidMount()
  {
    this.props.getListOfAliases()
    .then(response => {
      console.log('response', response.value.data)
      this.setState({aliasObj: response.value.data})
    })
    .catch(err => `Error in TagAlias.componentDidMount() - ${err}`);
  }
  
  render() {
    let aliasList = this.state.aliasObj.map((e,i) => {
      return (
        <tr key={'aliasInputBlock' + i}>
          <td className="alias-table-cell">{e.old_name}</td>
          <td className="alias-table-cell"><input placeholder={e.new_name}/></td>
          {/* <td className="alias-table-cell"><button
            onClick={() => }>x</button></td> */}
        </tr>
      );
    });

    return (
      <table className="alias-table">
        <tbody>
          {aliasList}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getListOfAliases })(TagAlias);