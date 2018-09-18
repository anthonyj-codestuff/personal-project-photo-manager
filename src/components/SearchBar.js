import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button as Dot } from 'antd';

import { setSearchTerms, getSearchResults, getListOfTags } from '../redux/generalReducer';
import 'antd/dist/antd.css';
import './SearchBar.css';

class SearchBar extends Component
{ 
  constructor()
  {
    super();
    this.state =
    {
      terms: '',
      currentTerm: ''
    };
  }

  componentDidMount()
  {
    this.props.getListOfTags();
  }

  render()
  {
    return (
      <div className="search-bar">
        <input 
          type="text" 
          placeholder=" Search"
          onChange={(e) => this.setState({terms: e.target.value})}
          value={this.state.terms}
        />
        <button onClick={() => 
          {
            this.props.setSearchTerms(this.state.terms);
            this.props.getSearchResults(this.state.terms);
          }}>Go</button>
        <Dot className="search-bar plus" type="primary" shape="circle" icon="plus" type="standard" size="small" />
        <Dot className="search-bar minus" type="primary" shape="circle" icon="minus" type="danger" size="small" />
      </div>
    );
  }
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {setSearchTerms, getSearchResults, getListOfTags})(SearchBar);