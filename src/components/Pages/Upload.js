import React from 'react';

import Header from '../Header';
import UploadPictureButton from './UploadComponents/uploadPictureButton';
import NewUploadForm from './UploadComponents/NewUploadForm';

const Upload = () => {
  return (
    <div>
      <Header/>
      <h1>Upload Page</h1>
      <UploadPictureButton/>
      {/* This should display only the images that the user just uploaded */}
      {/* Map through Redux's array of picture data and create one upload form for each one
          Each upload form has internal functionality to poll the database as the user finishes typing */}
      <NewUploadForm/>
    </div>
  );
};

export default Upload;