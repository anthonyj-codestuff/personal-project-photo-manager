import React from 'react';

import Header from '../Header';
import TagAlias from './DashboardTools/TagAlias';
import TagImplication from './DashboardTools/TagImplication';
import MassTagging from './DashboardTools/MassTagging';
import PopDownHeader from '../../components/PopDownHeader';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <div className='dt-header-div'><Header/></div>
      <div className='mb-header-div'><PopDownHeader/></div>
      <div className='info-box'>
        <h2>Advanced Funtionality:</h2>
        <p>The tools on this page allow you to define rules about how tags should be handled</p>
      </div>
      <div className="tag-rules-block">
        <TagAlias/>
        <TagImplication/>
      </div>
      <MassTagging/>
    </div>
  );
};

export default Dashboard;