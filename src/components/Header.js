import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
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
      modal: false,
      tooltipOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSearchError = this.toggleSearchError.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleSearchError() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
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
        <Button className="header-segment" color="primary" onClick={() => this.toggleModal()}><p>Search</p></Button>

        {/* From here on is the search modal */}

        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="search-modal">
          <ModalHeader toggle={this.toggleModal}>
            <p className="modal-title">Press <span style={{color: '#008000'}}>plus</span> to require a term</p>
            <p className="modal-title">Press <span style={{color: '#DD0000'}}>minus</span> to forbid a term</p>
          </ModalHeader>
          <ModalBody>
            {/* <SearchBar/> */}
            <SearchBarAutosuggest/>
            <div className="flex-row modal-search-terms">
              <div className="flex-column">
                {this.props.lastSearchArr.inc.map(e => <p className="green">{e}</p>)}
              </div>
              <div className="flex-column">
                {this.props.lastSearchArr.exc.map(e => <p className="red">{e}</p>)}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Link to="/" style={{ textDecoration: 'none' }}>
              
              {this.props.lastSearchArr.inc.length + this.props.lastSearchArr.exc.length > 0 ? 
                //If there is at least one search term selected, enable the button
              <Button 
                className="header-segment" 
                color='primary' 
                onClick={() => {
                  this.toggleModal();
                  this.props.getSearchResults(this.props.lastSearchArr);
                  }}>Search
              </Button>
              :
              <div>
                <Tooltip placement="top" isOpen={this.state.tooltipOpen} target="TooltipSearchError" toggle={this.toggleSearchError}>
                  Type in a search term and add it to the query with the plus and minus buttons
                </Tooltip>
                <Button 
                  id="TooltipSearchError"
                  className="header-segment" 
                  color='primary'>Search
                </Button>
              </div>}

            </Link>
            <Button 
              className="header-segment" 
              color="secondary" 
              onClick={() => {
                this.toggleModal();
                this.props.resetSearchToggle();
                }}>Cancel & Clear
            </Button>
          </ModalFooter>
        </Modal>
      </header>
    );
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSearchResults, resetSearchToggle })(Header);