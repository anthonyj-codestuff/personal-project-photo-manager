import React from 'react';
import DateTime from '../DateTime';

import './PicStatBlock.css';

const PicStatBlock = (props) => {
  const src = props.imgStats.src;
  return (
    <div className={`stat-block ${props.class}`}>
      <strong>Image Statistics</strong>
      <div>
        <div className='stat-block-main'>
          <p>Image ID: #{props.imgID}</p>
          <p>{`Display Dimensions: ${props.imgStats.imgx}*${props.imgStats.imgy}px`}</p>
          <p>{`Actual Dimensions: ${props.imgStats.imgX}*${props.imgStats.imgY}px`}</p>
          <p>Download Link: <a download href={src} title={props.imgStats.title}>
            {props.imgStats.title}</a></p>
          <DateTime datetime={props.uploadDate}/>
        </div>
        <div className='stat-block-tags'>
          <p><strong>Tags:</strong></p>
          <div className='stat-block-tags-list'>
            {props.tagsArray ? props.tagsArray.map((e,i) => {
              return (<p key={i}>{e.tag_name.replace(/[_]/g, ' ') + "\u00A0"}</p>);
            }) : 'Loading Tags'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PicStatBlock;