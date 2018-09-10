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
                <img className="single-image" src={e[0].url} alt={e[0].title}/>
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