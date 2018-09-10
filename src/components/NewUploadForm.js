import React, { Component } from 'react';
import './NewUploadForm.css';

const e = { 
  pid: 264, 
  url: "https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/images%2F10cbf44b-61b3-4e43-af57-4af36720c3e2.png?alt=media&token=5da8b052-f413-454d-bdc7-a8c5894476bd", 
  title: "Untitled" }

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
              <div key={e.pid} id={e.pid} className="single-form-container" >
                <img className="single-image" src={e.url} alt={e.title}/>
                <div className="new-upload-form">
                Title: <input /><br/>
                Tag: <input /><br/>
                <button>Submit</button>
                </div>
              </div>
            {/* )
          })
        } */}
      </div>
    </div>
  );
}

export default NewUploadForm;