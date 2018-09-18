import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getSearchResults, resetSearchToggle } from '../redux/generalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar';
import './Header.css';
import SearchBarAutosuggest from './SearchBarAutocomplete';

class Header extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render()
  {
    return (
      <header>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => this.props.resetSearchToggle()}>
          <Button className="header-segment" color='primary'><p>Gallery</p></Button>
        </Link>
        <Link to="/upload" style={{ textDecoration: 'none' }}>
          <Button className="header-segment" color='primary'><p>Upload</p></Button>
        </Link>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button className="header-segment" color='primary'><p>Options</p></Button>
        </Link>
        <Button className="header-segment" color="primary" onClick={() => this.toggle()}><p>Search</p></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="search-modal">
          <ModalHeader toggle={this.toggle}>Enter search terms</ModalHeader>
          <ModalBody>
            {/* <SearchBar/> */}
            <SearchBarAutosuggest/>
          </ModalBody>
          <ModalFooter>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button 
                className="header-segment" 
                color='primary' 
                onClick={() => {
                  this.toggle();
                  this.props.getSearchResults(this.props.lastSearchArr);
                  }}>Search</Button>
            </Link>
            <Button 
              className="header-segment" 
              color="secondary" 
              onClick={() => {
                  this.toggle();
                  this.props.resetSearchToggle();
                  }}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSearchResults, resetSearchToggle })(Header);