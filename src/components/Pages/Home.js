import React, { Component } from 'react';
import Header from '../Header';
import DefaultImageGallery from '../DefaultImageGallery';
// import './Home.css';

//Redux stuff
  import { connect } from 'react-redux';
  //When the component mounts, retrieve all pics from the database and set them to state to display
  import { getAllPics } from '../../redux/generalReducer';

class Home extends Component 
{
  componentDidMount()
  {
    //Upon visiting the home page, get all pictures from the database
    this.props.getAllPics();
  }
  render()
  {
    return (
      <div>
        <Header/>
        {/* {typeof(this.props.picsDataObj)} */}
        <DefaultImageGallery picData={this.props.picsDataObj}/>
      </div>
    ); //return
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {getAllPics})(Home);