import React from 'react';
import DateTime from '../DateTime';

const PicStatBlock = (props) => {
  return (
    <div className={`stat-block ${props.class}`}>
      <p>{`Image Dimensions: ${props.imgX}x${props.imgY}`}</p>
      <DateTime datetime={props.uploadDate}/>
    </div>
  );
};

export default PicStatBlock;