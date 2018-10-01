import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import { getSearchResults, resetSearchToggle, setSearchTermsInclusive, resetMassTaggingPool } from '../redux/generalReducer';
import './PopDownHeader.css'

class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarToggler onClick={this.toggle} />
          <NavbarBrand href="/">PicSorter</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" style={{ textDecoration: 'none' }} className="header-segment" onClick={() => this.props.resetSearchToggle()}>Gallery</Link>
              </NavItem>
              <NavItem>
                <Link to="/upload" style={{ textDecoration: 'none' }} className="header-segment">Upload</Link>
              </NavItem>
              <NavItem>
                <Link to="/dashboard" 
                style={{ textDecoration: 'none' }} 
                className="header-segment"
                //The link will not fire if the user is already on the Dashboard, so componentWillUnmount will not fire. Run the Mass Tagging cleanup function manually
                onClick={() => this.props.resetMassTaggingPool()}>Options</Link>
              </NavItem>
              <NavItem>
                <Button className="header-segment popdown-search-button" color="primary"><p>Search</p></Button> {/* onClick={() => this.toggleModal()} */}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getSearchResults, resetSearchToggle, setSearchTermsInclusive, resetMassTaggingPool })(Example)