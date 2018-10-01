import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

//only needed to gain access to props
import { connect } from 'react-redux';

import Header from '../Header';
import UploadPictureButton from './UploadComponents/uploadPictureButton';
import NewUploadForm from './UploadComponents/NewUploadForm';
import PopDownHeader from '../../components/PopDownHeader';
import './Upload.css';

const Upload = (props) => {
  return (
    <div>
      <div className='dt-header-div'><Header/></div>
      <div className='mb-header-div'><PopDownHeader/></div>
      <h2>Upload Page</h2>
      <UploadPictureButton/>
      {/* This should display only the images that the user just uploaded */}
      {/* Map through Redux's array of picture data and create one upload form for each one
          Each upload form has internal functionality to poll the database as the user finishes typing */}
      <div className="new-picture-forms">
      {props.userNewUploads.length ? <p>New Uploads</p> : null}
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
        {props.userNewUploads.length ? 
        <div className='space-top flex-row flex-center-x'>
          <Link to="/" style={{ textDecoration: 'none' }}>
            {/* Does nothing but redirect the user to home. Data is saved automatically as they type */}
            <Button className='header-segment' color='primary' style={{'width':'200px'}}>Submit Changes</Button>
          </Link>
        </div> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Upload);
// export default connect(mapStateToProps, {getAllPics})(Home);