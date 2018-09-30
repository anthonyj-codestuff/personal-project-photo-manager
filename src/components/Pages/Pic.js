import React, { Component } from 'react';
import axios from 'axios';

import Header from '../Header';
import PopDownHeader from '../PopDownHeader';
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
      imgStats: {},
      description: 'none', //not implemented
      tags: [] //Passed down into the stat block
    };
    this.onImgLoad = this.onImgLoad.bind(this);
    this.retrieveTagList = this.retrieveTagList.bind(this);
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

  retrieveTagList(tags)
  {
    console.log(tags)
    this.setState({tags});
  }

  onImgLoad({target:img}) {
    const { naturalHeight, 
            naturalWidth, 
            offsetHeight, 
            offsetWidth,
            alt,
            src } = document.getElementById('currently-loaded-img');
    this.setState({imgStats:{
        imgX:naturalWidth,
        imgY:naturalHeight,
        imgx:offsetWidth,
        imgy:offsetHeight,
        title:alt,
        src
      }
    });
  }

  render()
  {
    return (
      <div>
        <Header/>
        <PopDownHeader/>
        <div className="main-block">
          <div className="left-block">
            <div className="pic-title-block">
              <h2>{this.state.title}</h2>
              <img id='currently-loaded-img' src={this.state.currentPic} alt={this.state.title} onLoad={this.onImgLoad}/>
            </div>
            <PicStatBlock
              class="under-pic"
              imgID={this.props.match.params.pid}
              imgStats={this.state.imgStats} 
              uploadDate={this.state.uploadDate}
              tagsArray={this.state.tags}/>
            <div className="tag-cloud">
              <strong>Use this box to apply categories to an image.</strong>
              <p>Tags are separated by spaces.</p>
              <p>If you wish to make a tag that contains a space, insert an underscore (_) in its place</p>
              <TagEditBox 
                pid={this.props.match.params.pid}
                sendTagsToParent={this.retrieveTagList}/>
            </div>
          </div>
          <PicStatBlock 
            class='sidebar'
            imgID={this.props.match.params.pid}
            imgStats={this.state.imgStats}
            uploadDate={this.state.uploadDate}
            tagsArray={this.state.tags}/>
        </div>
      </div>
    );
  }
};

export default Pic;