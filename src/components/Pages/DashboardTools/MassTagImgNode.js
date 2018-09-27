import React, { Component } from 'react';
import check from './checkmark.svg';

class MassTagImgNode extends Component 
{
  constructor(props)
  {
    super(props)
    this.state =
    {
      isSelected: this.props.isSelected || false
    };
  }
  render() 
  {
    let renderSelectedIcon = <img src={check}/>
    return (
      <div 
        className='square'
        style={{'backgroundImage':`url(${this.props.src})`}}
        onClick={() => {
          this.props.selectCardFn(this.props.id);
          this.setState({isSelected: !this.state.isSelected});
        }}>
        {this.state.isSelected && renderSelectedIcon}
      </div>
    ); //return
  }
}

export default MassTagImgNode;