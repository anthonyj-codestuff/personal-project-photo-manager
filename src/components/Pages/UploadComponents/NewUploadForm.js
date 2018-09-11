import React, { Component } from 'react';
import './NewUploadForm.css';

const e = [
  {pid: 291, 
  url: "https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/images%2F2b8d6186-9f76-4097-82f8-a3b0c04f90be.png?alt=media&token=c039d080-ff3b-46c4-8470-5e2df6bb29e6", 
  title: "Untitled"},
  {pid: 301, 
  url: "https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/images%2F74ea229d-af81-4fa7-80ad-6c53f81c5bf8.png?alt=media&token=eca796f2-e6f8-4b42-91fd-ea10f6bcbf82", 
  title: "Untitled"}]

//pass in an array of objects containing AT LEAST a, ID, title and URL
const NewUploadForm = () => 
{
  return (
    <div>
      <p>New Uploads</p>
      <div className="new-picture-forms">
        {/* {props.picData.map((e) => 
          {
            return ( */}
              <div key={e[0].pid} id={e[0].pid} className="single-form-container" >
                <img className="single-image new-image" src={e[0].url} alt={e[0].title}/>
                <div className="middle-box">
                    <p>Title:</p>
                    <input className="middle-box-form" placeholder={e[0].title}/><br/>
                    <p>Folder:</p>
                    <select className="middle-box-form">
                      <option value="null">Not Implemented</option>
                      <option value="null">Not Implemented</option>
                      <option value="null">Not Implemented</option>
                      <option value="null">Not Implemented</option>
                    </select> 
                </div>
                <div className="right-box">
                  <div>
                    <p>Tags:</p>
                  </div>
                  <div className="new-upload-tag-box" >
                    <textarea/>
                  </div>
                </div>
              </div>
            {/* )
          }) Put this back when it's time to map out the info forms
        } */}
      </div>
    </div>
  );
}

export default NewUploadForm;