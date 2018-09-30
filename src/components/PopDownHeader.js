import React from 'react';
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
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" style={{ textDecoration: 'none' }} onClick={() => this.props.resetSearchToggle()}>Gallery</Link>
              </NavItem>
              <NavItem>
                <Link to="/upload" style={{ textDecoration: 'none' }}>Upload</Link>
              </NavItem>
              <NavItem>
                <Link to="/dashboard" 
                style={{ textDecoration: 'none' }} 
                //The link will not fire if the user is already on the Dashboard, so componentWillUnmount will not fire. Run the Mass Tagging cleanup function manually
                onClick={() => this.props.resetMassTaggingPool()}>Options</Link>
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