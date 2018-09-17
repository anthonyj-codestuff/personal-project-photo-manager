import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './DefaultImageGallery.css';

//pass in an array of objects containing AT LEAST an ID, title and URL
//Optionally pass in the user's last search terms. If search terms are supplied, they will show up in the gallery header
const DefaultImageGallery = (props) => 
{
  return (
    <div className="gallery-container">
      {props.searchTerms.length > 0 ? <p>Search Results for "{props.searchTerms}"</p> : <p>Image Gallery</p>}
      <div className="image-gallery">
        {props.picData.length > 0 ? //Check if there is picData in 
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
          : props.searchTerms.length > 0 ? //User has just searched for something
            <h4>Oops! Your search results came up empty! Try checking your spelling or removing some restrictions</h4>
          : <h3>There doesn't seem to be anything in this gallery. Try uploading some pictures!</h3> //should only show up if the gallery is barren of images
        }
      </div>
    </div>
  );
}

export default DefaultImageGallery;