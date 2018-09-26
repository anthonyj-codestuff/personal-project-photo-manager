import React, { Component } from 'react';
import check from './checkmark.svg';

class MassTagImgNode extends Component 
{
  constructor(props)
  {
    super(props)
    this.state =
    {
      isSelected: false
    };
  }
  render() 
  {
    let renderSelectedIcon = <div></div>
    return (
      <div className='square' style={{'background-image':`url(${this.props.src})`}}>
        <div><img src={check}/></div>
      </div>
    ); //return
  }
}

export default MassTagImgNode;