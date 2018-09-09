import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
// import { Provider } from 'react-redux
import logo from './logo.svg';
import './App.css';
import UploadPictureButton from './components/uploadPictureButton';

class App extends Component {
  render() {
    return (
      <HashRouter>
      <div className="App">
        <UploadPictureButton/>
        {/* <PublicGallery/> */}
      </div>
      </HashRouter>
    );
  }
}

export default App;
