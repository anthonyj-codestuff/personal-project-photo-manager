import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header';
import DateTime from '../DateTime';
import './Pic.css';
import TagEditBox from './PicStatComponents/TagEditBox';

class Pic extends Component
{
  constructor()
  {
    super()
    this.state =
    {
      currentPic:'',
      title: '',
      uploadDate: '',
      description: 'none', //not implemented
      tagCloudObj: {} //not implemented
    };
  }

  componentDidMount()
  {
    axios.get(`/api/photos/${this.props.match.params.pid}`)
    .then(response => this.setState({
      currentPic: response.data[0]["url"],
      title: response.data[0]["title"],
      uploadDate: response.data[0]["datetime"]
    }))
    .catch(err => console.log(`Error in Pic.componentDidMount() - ${err}`))
  }

  render()
  {
    return (
      <div>
        <Header/>
        <div className="main-block">
          <div className="left-block">
            <div className="pic-title-block">
              <h2>{this.state.title}</h2>
              <img src={this.state.currentPic} alt={this.state.title}/>
            </div>
            <div className="stat-block">
              <p><DateTime datetime={this.state.uploadDate}/></p>
              Stats: Size, dimensions, upload date, ratio
            </div>
            <div className="tag-cloud">
              <p>It would be really cool to render a tag cloud here, but when you click on it, it switches to a text box where you can edit the tags</p>
              <TagEditBox pid={this.props.match.params.pid}/>
            </div>
          </div>
          <div className="right-block">
            Single Photo Options: edit tags, download, crop, rotate, add to folder, delete photo
          </div>
        </div>

      </div>
    );
  }
};

export default Pic;