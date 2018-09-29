import React, { Component } from 'react';
import check from './checkmark.svg';

class MassTagImgNode extends Component 
{
  constructor(props)
  {
    super(props)
    this.state =
    {
      isSelected: this.props.selectedCardNum === this.props.id || false
    };
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(prevProps.selectedCardNum === this.props.id &&
      this.props.selectedCardNum !== this.props.id){
        // this.props.selectCardFn(this.props.id);
        this.setState({isSelected: !this.state.isSelected})
    }
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