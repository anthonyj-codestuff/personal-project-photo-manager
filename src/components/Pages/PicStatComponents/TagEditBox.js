import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { editPicTags } from '../../../redux/generalReducer';
import './TagEditBox.css';

// Pass in a picture ID on props and this piece will do the rest

class TagEditBox extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      tagString: ''
    };
  }

  componentDidMount()
  {
    //When rendering the tag editing box, retrieve all existing tags from the db
    const {pid} = this.props;
    axios.get(`/api/tags/${pid}`)
    .then(response => 
      {
        // The response comes back as an array of objects, so destructure and sort in alphabetical order
        let tags = response.data.map(e => e.tag_name).sort().join(' ');
        this.setState({tagString:tags});
        this.props.sendTagsToParent(response.data);
      })
    .catch(err => console.log(`Error in TagEditBox.ComponentDidMount() - ${err}`));
  }

  render()
  {
    const {pid} = this.props;
    return (
      <textarea 
        onBlur={(e) => this.props.editPicTags({pid:pid, tags:this.state.tagString})}
        onChange={(e) => this.setState({tagString:e.target.value})}
        value={this.state.tagString}
        placeholder="enter_tags_here"/>
    );
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { editPicTags })(TagEditBox);