import React from 'react';

//only needed to gain access to props
import { connect } from 'react-redux';

import Header from '../Header';
import UploadPictureButton from './UploadComponents/uploadPictureButton';
import NewUploadForm from './UploadComponents/NewUploadForm';
import './Upload.css';

const Upload = (props) => {
  return (
    <div>
      <Header/>
      <h1>Upload Page</h1>
      <UploadPictureButton/>
      {/* This should display only the images that the user just uploaded */}
      {/* Map through Redux's array of picture data and create one upload form for each one
          Each upload form has internal functionality to poll the database as the user finishes typing */}
      <div className="new-picture-forms">
      <p>Test - Delete when finished</p>
      <NewUploadForm
                  pid={291}
                  url={"https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/images%2F2b8d6186-9f76-4097-82f8-a3b0c04f90be.png?alt=media&token=c039d080-ff3b-46c4-8470-5e2df6bb29e6"}
                  title={"Untitled"}/>
      <p>New Uploads</p>
        {props.userNewUploads.map((e) => 
            {
              return (
                <NewUploadForm
                  key={e.pid}
                  pid={e.pid}
                  url={e.url}
                  title={e.title}/>
              )
            }
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Upload);
// export default connect(mapStateToProps, {getAllPics})(Home);