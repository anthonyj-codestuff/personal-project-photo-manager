import React, { Component } from 'react';

import { connect } from 'react-redux';
import { editPicTitle } from '../../../redux/generalReducer';

import './NewUploadForm.css';

//takes in the data from one picture and creates an edit form
//each input field fires a PUT request after the user has finished 
const NewUploadForm = (props) => 
{
  return (
    <div>
      <div className="single-form-container" >
        <img className="single-image new-image" src={props.url} alt={props.title}/>
        <div className="middle-box">
          <p>Title:</p>
          <input 
            className="middle-box-form" 
            placeholder={props.title}
            onBlur={(e) => props.editPicTitle({pid:props.pid, title:e.target.value})}/><br/>
          <p>Folder:</p>
          <select className="middle-box-form">
            <option value="null">Not Implemented</option>
            <option value="null">Not Implemented</option>
          </select> 
        </div>
        <div className="right-box">
          <div>
            <p>Tags:</p>
          </div>
          <div className="new-upload-tag-box" >
            <textarea placeholder="enter_tags_here"/>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { editPicTitle })(NewUploadForm);