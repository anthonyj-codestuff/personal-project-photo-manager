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
      <h2>Upload Page</h2>
      <UploadPictureButton/>
      {/* This should display only the images that the user just uploaded */}
      {/* Map through Redux's array of picture data and create one upload form for each one
          Each upload form has internal functionality to poll the database as the user finishes typing */}
      <div className="new-picture-forms">
      <p>Test - Delete when finished</p>
      <NewUploadForm
                  pid={490}
                  url={"https://firebasestorage.googleapis.com/v0/b/photo-storage-test-40dab.appspot.com/o/don't%20delete%2FMaOswE8.png?alt=media&token=65f7c686-a01f-4cb8-a034-00dee00804f3"}
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