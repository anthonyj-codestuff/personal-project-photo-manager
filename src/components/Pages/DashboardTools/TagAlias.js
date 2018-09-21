import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getListOfAliases } from '../../../redux/generalReducer';

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
    console.log('hit', this.state.aliasObj);
    return (this.state.aliasObj.map((e,i) => {
        return (<div id={'alias' + i} style={{border: '1px solid #0000FF'}}>
          <input placeholder={e.old_name}/>
          <input placeholder={e.new_name}/>
        </div>)
      })
    );
  
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getListOfAliases })(TagAlias);