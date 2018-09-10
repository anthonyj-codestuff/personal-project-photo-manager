import React, { Component } from 'react';
import './DefaultImageGallery.css';

//pass in an array of objects containing AT LEAST a, ID, title and URL
const DefaultImageGallery = (props) => 
{
  return (
    <div className="gallery-container">
      <p>Image Gallery</p>
      <div className="image-gallery">
        {props.picData.map((e) => 
          {
            return (
              <div key={e.pid} id={e.pid} >
                <img className="single-image" src={e.url} alt={e.title}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default DefaultImageGallery;