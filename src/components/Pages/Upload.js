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
                  url={"https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/images%2Ff9d4dc61-bdd2-4d14-a30e-928a0b1339a2.png?alt=media&token=813e5f25-4113-4d05-a0eb-0f989410dba1"}
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