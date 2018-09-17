import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Button as Dot } from 'antd';
import { connect } from 'react-redux';

import { setSearchTerms, sendSearchTerms } from '../redux/generalReducer';
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
          <button onClick={() => 
            {
              this.props.setSearchTerms(this.state.terms);
              this.props.sendSearchTerms(this.state.terms);
            }
          }>Go</button>
          <Dot type="primary" shape="circle" icon="plus" type="standard" size="small" />
          <Dot type="primary" shape="circle" icon="minus" type="danger" size="small" />
        </div>
    );
  }
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {setSearchTerms, sendSearchTerms})(SearchBar);