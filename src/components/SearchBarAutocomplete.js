import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { Button as Dot } from 'antd';
import { setSearchTerms, getListOfTags } from '../redux/generalReducer';
import 'antd/dist/antd.css';

const languages = [
  {name: 'C',  year: 1972},{name: 'C#',  year: 2000},{name: 'C++',  year: 1983},{name: 'Clojure',  year: 2007},{name: 'Elm',  year: 2012},{name: 'Go',  year: 2009},{name: 'Haskell',  year: 1990},{name: 'Java',  year: 1995},{name: 'Javascript',  year: 1995},{name: 'Perl',  year: 1987},{name: 'PHP',  year: 1995},{name: 'Python',  year: 1991},{name: 'Ruby',  year: 1995},{name: 'Scala',  year: 2003}
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.tag_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.tag_name}</span>
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
    const escapedValue = escapeRegexCharacters(value.trim());
    
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
      placeholder: "Type 'c'",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { setSearchTerms, getListOfTags })(SearchBarAutosuggest);