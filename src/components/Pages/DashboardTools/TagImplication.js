import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getListOfImps, addImp, deleteImp } from '../../../redux/generalReducer';
import './TagImplication.css';

class TagImplication extends Component 
{
  render() 
  {
    return (
      <div>
        TagImplication
      </div>
    ); //return
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getListOfImps, addImp, deleteImp })(TagImplication);