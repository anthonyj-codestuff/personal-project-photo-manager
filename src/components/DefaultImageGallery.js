import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './DefaultImageGallery.css';

//pass in an array of objects containing AT LEAST an ID, title and URL
const DefaultImageGallery = (props) => 
{
  return (
    <div className="gallery-container">
      <p>Image Gallery</p>
      <div className="image-gallery">
        {props.picData.length > 0 ?
          //picData is populated
          props.picData.map((e) => 
          {
            return (
              <div key={e.pid} id={e.pid} >
                <Link to={`/pic/${e.pid}`} style={{ textDecoration: 'none' }}>
                  {/* assign url to each card, but insert a '-small' after the filename */}
                  <img className="single-image" src={e.url.replace(/(\?alt)/,'-small?alt')} alt={e.title}/>
                </Link>
              </div>
            )
          })
          //picData is an empty array
          : <h3>There doesn't seem to be anything in this gallery</h3>
        }
      </div>
    </div>
  );
}

export default DefaultImageGallery;