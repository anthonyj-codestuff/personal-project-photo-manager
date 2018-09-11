import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import fbConfig from '../../../Firebase';
import firebase from "firebase";

//Redux stuff
import { connect } from 'react-redux';
import { sendPicToDB, clearPrevUploadData } from '../../../redux/generalReducer';

import './uploadPictureButton.css'

class UploadPictureButton extends Component {
  constructor()
  {
    super()
    this.state = {
      isUploading: false,
      progress: 0,
      newURL: "",
      userID: 3 //TODO: Set this to the user's ID on session
    };
  }
  
  //set loading and progress vars
  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 })
    this.props.clearPrevUploadData();
  };
  handleProgress = (progress) => this.setState({ progress });
  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    console.error(error);

  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
    .then(url => 
      {
        this.setState({ newURL: url});
        //send the url and user id to the databse
        this.props.sendPicToDB(url, this.state.userID);
      })
  };
    
  render() {
    // console.log(fbConfig)
    return (
      <div className="upload-module">
        <label>
          {this.state.isUploading && <p>Uploading: {this.state.progress}</p>}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            multiple={"multiple"}
            />
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { sendPicToDB, clearPrevUploadData })(UploadPictureButton);