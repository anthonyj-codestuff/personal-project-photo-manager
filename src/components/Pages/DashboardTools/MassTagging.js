import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { Button, Tooltip } from 'reactstrap';
import { Button as Dot } from 'antd';
import { getAllPics, getListOfTags, getSearchResultsTagTool } from '../../../redux/generalReducer';

import MassTagImgNode from './MassTagImgNode';
import 'antd/dist/antd.css';
import './MassTagging.css';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.tag_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {/* the search results should not be displayed with underscores. Convert them to spaces */}
      {suggestion.tag_name.replace(/[_]/g, ' ')}
    </span>
  );
}

class MassTagging extends Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      searchTooltipOpen: false,
      searchBarValue: '',
      selectedSearchTerms: [],
      tagAutocompleteSuggestions: []
    };
    this.toggleMassSearchError = this.toggleMassSearchError.bind(this);
  }

  componentDidMount(){
    // avoid making uneccesary requests for large amounts of data
    if(this.props.globalTags.length <= 0)
    {
      this.props.getListOfTags();
    }
    if(this.props.picsDataObj.length <= 0)
    {
      this.props.getAllPics();
    }
  }
  
  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim().replace(/[\s]/g, '_'));
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.globalTags.filter(tag => regex.test(tag.tag_name));
  }
  
  onChange = (event, { newValue, method }) => {
    this.setState({searchBarValue: newValue});
  };

  addTermToList()
  {
    // trim off any external whitespace and replace internal whitespace with underscores to conform with db schema
    let term = this.state.searchBarValue.trim().replace(/[\s]/g, '_');
    this.setState({selectedSearchTerms: this.state.selectedSearchTerms.concat(term)});
    this.setState({searchBarValue: ''});
  }

  onKeyPress = (e) => {
    if(e.key === 'Enter')
    {
      this.addTermToList();
    }
  }
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({tagAutocompleteSuggestions: this.getSuggestions(value)});
  };

  onSuggestionsClearRequested = () => {
    this.setState({tagAutocompleteSuggestions: []});
  };

  toggleMassSearchError(){
    this.setState({searchTooltipOpen: !this.state.searchTooltipOpen});
  };

  normalSearchButtonFn(){
    // before searching, put any straggling search term into the array
    let term = this.state.searchBarValue.trim().replace(/[\s]/g, '_');
    term ? //prevent empty strings from being pushed to the terms list
    this.setState({selectedSearchTerms: this.state.selectedSearchTerms.concat(term)})
    : null;
    // package the search array in a format that the function understands
    // exclusive terms are not currently allowed in the mass tagging tool
    this.props.getSearchResultsTagTool({
      inc: this.state.selectedSearchTerms,
      exc: []
      });
  }

  render() 
  {
    let squares = this.props.massTagSearchResults.map((e,i) => {
      return <MassTagImgNode 
              className='square' 
              key={e.pid}
              id={e.pid}
              src={e.url.replace(/(\?alt)/,'-small?alt')} 
              alt={e.title}/>
    });

    const { tagAutocompleteSuggestions, searchBarValue } = this.state;
    const inputProps = {
      placeholder: "Enter a search term",
      value: searchBarValue,
      onChange: this.onChange,
      onKeyPress: this.onKeyPress
    };

    // Define button types
    const normalSearchButton = (<Button className="header-segment" color='primary' 
                                  onClick={() => {this.normalSearchButtonFn()}}>
                                  Search</Button>);
    // disabledSearchButton does not do anything, but displays a tooltip on mouseover or click
    const disabledSearchButton = (<div><Tooltip placement="top" isOpen={this.state.searchTooltipOpen} target="TooltipMassSearchError" toggle={this.toggleMassSearchError}>
                                  Type in a search term and add it to the query with the plus button</Tooltip>
                                  <Button id="TooltipMassSearchError" className="header-segment"  color='primary'>
                                  Search</Button></div>); 

    return (
      <div className="tag-rules-block">
        <div className='out'>
          <div className='in'>
            <div className='gui sticky'>
              <div className="search-bar-row"> {/* Inherited from the header stylesheet */}
              <Autosuggest 
                suggestions={tagAutocompleteSuggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps} />
              <Dot 
                className="plus" 
                type="primary" 
                shape="circle" 
                icon="plus" 
                type="standard" 
                size="small" 
                onClick={() => {
                  if(this.state.searchBarValue) //prevents the user from entering a blank string
                    {
                      this.addTermToList();;
                      this.setState({searchBarValue: ''})
                    };
                  }}/>
              </div>
              {this.state.selectedSearchTerms.map(e => <p className="green">x {e.replace(/[_]/g, ' ')}</p>)}
              {(this.state.selectedSearchTerms.length > 0) || 
                this.state.searchBarValue.trim() ? 
                normalSearchButton 
                : disabledSearchButton}
            </div>
          </div>
          <div className='wrap-box'>
            {squares}
          </div>
        </div>
      </div>
    ); //return
  }
}

const mapStateToProps = (state) => ({
  globalTags: state.globalTags,
  picsDataObj: state.picsDataObj,
  massTagSelectedPool: state.massTagSelectedPool,
  massTagSearchResults: state.massTagSearchResults});
export default connect(mapStateToProps, { getAllPics, getListOfTags, getSearchResultsTagTool })(MassTagging);