import React, { Component } from 'react';
import './NewUpload.css'

const NewUpload = (props) =>
{
  // console.log("NewUpload ID ", props);
  return (
    <div className="image-just-posted">
      <img src={props.url} alt={props.alt}/>
      <h1>IT'S RIGHT HERE</h1>
    </div>
  );
}

export default NewUpload;