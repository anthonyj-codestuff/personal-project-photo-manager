import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendSearchTerms } from '../redux/generalReducer';
import './SearchBar.css';

class SearchBar extends Component
{ 
  constructor()
  {
    super();
    this.state =
    {
      terms: ''
    };
  }

  render()
  {
    return (
        <div className="search-bar-div">
          <input 
            type="text" 
            placeholder=" Search"
            onChange={(e) => this.setState({terms: e.target.value})}
            value={this.state.terms}
          />
          <button onClick={() => this.props.sendSearchTerms(this.state.terms)}>Go</button>
        </div>
    );
  }
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {sendSearchTerms})(SearchBar);