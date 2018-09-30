import React, { Component } from 'react';

import { connect } from 'react-redux';
import { editPicTitle, editPicTags } from '../../../redux/generalReducer';

import TagEditBox from '../PicStatComponents/TagEditBox';
import './NewUploadForm.css';

//takes in the data from one picture and creates an edit form
//each input field fires a PUT request after the user has finished 
const NewUploadForm = (props) => 
{
  return (
    <div className="single-form-container" >
      <div className='mobile-top'>
        <div className='new-image-box'>
          <img className='new-image' src={props.url} alt={props.title}/>
        </div>
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
      </div>
      <div className="right-box">
        <div>
          <p>Tags:</p>
        </div>
        <div className="new-upload-tag-box" >
          <TagEditBox pid={props.pid}/>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { editPicTitle, editPicTags })(NewUploadForm);