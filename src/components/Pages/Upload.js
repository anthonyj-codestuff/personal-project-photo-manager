import React from 'react';

import Header from '../Header';
import UploadPictureButton from '../uploadPictureButton';
import NewUploadForm from '../NewUploadForm';

const Upload = () => {
  return (
    <div>
      <Header/>
      <h1>Upload Page</h1>
      <UploadPictureButton/>
      {/* This should display only the images that the user just uploaded */}
      <NewUploadForm/>
    </div>
  );
};

export default Upload;