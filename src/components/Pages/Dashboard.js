import React from 'react';

import Header from '../Header';
import TagAlias from './DashboardTools/TagAlias';
import TagImplication from './DashboardTools/TagImplication';
import MassTagging from './DashboardTools/MassTagging';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <div className='info-box'>
        <h2>Advanced Funtionality:</h2>
        <p>The tools on this page allow you to define rules about how tags should be handled</p>
        <ul>
          <li><strong>Aliases</strong> allow the user to alter tags before they are added to the database. They can be used to correct common misspellings or consolidate two tags with an identical meaning</li>
          <li><strong>Implication</strong> provide the user the ability to add new tags automatically by entering a child tag.</li>
          <li><strong>Mass Tagging</strong> provides the ability to appply the same tag to many images at once.</li>
        </ul>
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