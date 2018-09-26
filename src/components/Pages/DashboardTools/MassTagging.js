import React, { Component } from 'react';
import SearchBarAutosuggest from '../../SearchBarAutocomplete';

import './MassTagging.css';

class MassTagging extends Component 
{
  constructor()
  {
    super()
    this.state =
    {
      searchBarValue: ''
    };
    this.setSearchbarValue = this.setSearchbarValue.bind(this);
  }

  setSearchbarValue(value)
  {
    this.setState({searchBarValue: value});
  }

  render() 
  {
    let test = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    // let test = [];
    let squares = test.map((e,i) => <div className='square'>{e}</div>);

    return (
      <div className="tag-rules-block">
        {/* <SearchBarAutosuggest 
            setSearchbarValue={this.setSearchbarValue}
            value={this.state.searchBarValue}/> */}
        <div className='out'>
          <div className='in'/>
          <div className='wrap-box'>
            {squares}
          </div>
        </div>
        {/* <div className="flex-row modal-search-terms">
          <div className="flex-column">
            {this.props.lastSearchArr.inc.map(e => <p className="green">{e.replace(/[_]/g, ' ')}</p>)}
          </div>
          <div className="flex-column">
            {this.props.lastSearchArr.exc.map(e => <p className="red">{e.replace(/[_]/g, ' ')}</p>)}
          </div>
        </div> */}
      </div>
    ); //renturn
  }
}

export default MassTagging;