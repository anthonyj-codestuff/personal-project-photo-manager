import React, { Component } from "react";
import axios from 'axios';
import FileUploader from "react-firebase-file-uploader";
import fbConfig from '../Firebase';
import firebase from "firebase";
import './uploadPictureButton.css'
import PublicGallery from "./PublicGallery";

class UploadPictureButton extends Component {
  constructor()
  {
    super()
    this.state = {
      batchPhotoId: [],
      isUploading: false,
      progress: 0,
      newURL: "",
      userID: 3
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
        // console.log(url);
        // console.log(this.state.userID);
      }) //TODO: Set this to the user's ID on session
  };

  sendURLtoDB = (url, uid) =>
  {
    axios.post('/api/submit', {url, uid})
    .then(response => 
      {
        let newArr = this.state.batchPhotoId;
        newArr.push(response.data[0].pid);
        this.setState({batchPhotoId: newArr});
        // console.log(response.data[0].pid);
        // console.log(this.state.batchPhotoId);
      });
    // .catch();
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
        <br/><p>{this.state.newURL || "Nothing to show here"}</p>
        <div>
          <PublicGallery arr={this.state.batchPhotoId}/>
        </div>
      </div>
    );
  }
}

export default UploadPictureButton;