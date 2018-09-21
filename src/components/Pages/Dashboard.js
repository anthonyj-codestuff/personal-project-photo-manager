import React from 'react';

import Header from '../Header';
import TagAlias from './DashboardTools/TagAlias';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <div className='main-block'>
        <h2>Desired functionality:</h2>
        <p>Tag aliasing, implication, merging, & auditing. Mass tagging. Photo editing (cropping, rotating, maybe color correction) Folders. </p>
        <h2>Desired functionality:</h2>
        <p>Tag aliasing, implication, merging, & auditing. Mass tagging. Photo editing (cropping, rotating, maybe color correction) Folders. </p>
      </div>
      <div className='main-block'>
        <TagAlias/>
      </div>
    </div>
  );
};

export default Dashboard;