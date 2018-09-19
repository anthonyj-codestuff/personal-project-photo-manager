import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { Button as Dot } from 'antd';
import { setSearchTermsInclusive, setSearchTermsExclusive, getListOfTags } from '../redux/generalReducer';
import 'antd/dist/antd.css';
import './SearchBarAutocomplete.css';

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

class SearchBarAutosuggest extends Component 
{
  constructor() 
  {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount()
  {
    this.props.getListOfTags();
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
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter a search term",
      value,
      onChange: this.onChange
    };

    return (
      <div className="search-bar-row">
        <Autosuggest 
          suggestions={suggestions}
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
            if(this.state.value) //prevents the user from entering a blank string
              {this.props.setSearchTermsInclusive(this.state.value.replace(/[\s]/g, '_'));
              this.setState({value: ''})};
            }}/>
        <Dot 
          className="minus" 
          type="primary" 
          shape="circle" 
          icon="minus" 
          type="danger" 
          size="small" 
          onClick={() => { // send the value to the search terms array and prepend it with a minus sign
            if(this.state.value)
              {this.props.setSearchTermsExclusive(this.state.value.replace(/[\s]/g, '_'));
              this.setState({value: ''})};
            }}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { setSearchTermsInclusive, setSearchTermsExclusive, getListOfTags })(SearchBarAutosuggest);