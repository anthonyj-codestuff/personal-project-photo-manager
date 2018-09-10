import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import fbConfig from '../Firebase';
import firebase from "firebase";

//Redux stuff
import { connect } from 'react-redux';
import { sendPicToDB } from '../redux/generalReducer';

//styling and ocmponents
import './uploadPictureButton.css'
import DefaultImageGallery from "./DefaultImageGallery";
import NewUploadForm from "./NewUploadForm";

class UploadPictureButton extends Component {
  constructor()
  {
    super()
    this.state = {
      batchPhotoId: [],
      isUploading: false,
      progress: 0,
      newURL: "",
      userID: 3 //TODO: Set this to the user's ID on session
    };
    
    this.sendURLtoDB = this.sendURLtoDB.bind('this');
  }
  
  //set loading and progress vars. Clear existing batch array
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0, batchPhotoId: [] });
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
        this.sendURLtoDB(url, this.state.userID);
      })
  };

  sendURLtoDB = (url, uid) =>
  {
    //send the url to the databse and retrieve the newest picture id
    const newPid = this.props.sendPicToDB(url, uid)
    //add the new pid to local state
    this.setState({batchPhotoId: [...this.state.batchPhotoId, newPid]});
  }
    
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
        {this.props.picsDataObj.length > 0 && <DefaultImageGallery picData={this.props.picsDataObj}/>}
        <NewUploadForm/>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { sendPicToDB })(UploadPictureButton);