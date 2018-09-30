import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header';
import DateTime from '../DateTime';
import './Pic.css';
import TagEditBox from './PicStatComponents/TagEditBox';
import PicStatBlock from './PicStatBlock';

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
      dimensions: {},
      description: 'none', //not implemented
      tagCloudObj: {} //not implemented
    };
    this.onImgLoad = this.onImgLoad.bind(this);
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

  onImgLoad({target:img}) {
    this.setState({dimensions:{
        height:document.getElementById('currently-loaded-img').naturalHeight, 
        width:document.getElementById('currently-loaded-img').naturalWidth
      }
    });
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
              <img id='currently-loaded-img' src={this.state.currentPic} alt={this.state.title} onLoad={this.onImgLoad}/>
            </div>
            <PicStatBlock
              class="under-pic"
              imgX={this.state.dimensions.width} 
              imgY={this.state.dimensions.height}
              uploadDate={this.state.uploadDate}/>
            <div className="tag-cloud">
              <p>It would be really cool to render a tag cloud here, but when you click on it, it switches to a text box where you can edit the tags</p>
              <TagEditBox pid={this.props.match.params.pid}/>
            </div>
          </div>
          <PicStatBlock 
            class='sidebar'
            imgX={this.state.dimensions.width} 
            imgY={this.state.dimensions.height}
            uploadDate={this.state.uploadDate}/>
        </div>
      </div>
    );
  }
};

export default Pic;