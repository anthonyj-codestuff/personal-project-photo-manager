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
    let renderSelectedIcon = <img src={check}/>
    return (
      <div 
        className='square'
        style={{'background-image':`url(${this.props.src})`}}
        onClick={() => {
          console.log('hit2');
          this.props.selectCard(this.props.id);
          this.setState({isSelected: !this.state.isSelected});
        }}>
        {this.state.isSelected && renderSelectedIcon}
      </div>
    ); //return
  }
}

export default MassTagImgNode;