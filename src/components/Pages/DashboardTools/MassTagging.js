import React, { Component } from 'react';
import { connect } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import { Button, Tooltip, Fade } from 'reactstrap';
import { Button as Dot } from 'antd';
import { getAllPics, getListOfTags, getSearchResultsTagTool, resetMassTaggingPool, applyTagToPool } from '../../../redux/generalReducer';

import MassTagImgNode from './MassTagImgNode';
import 'antd/dist/antd.css';
import './MassTagging.css';

// TODO: This component is a rat's nest. Clean this up if there's time

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.tag_name.replace(/[_]/g, ' ');
  // return suggestion.tag_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {/* the search results should not be displayed with underscores. Convert them to spaces */}
      {suggestion.tag_name.trim().replace(/[_]/g, ' ')}
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
      tagTooltipOpen: false,
      searchBarValue: '',
      tagBarValue: '',
      selectedSearchTerms: ['outdoors'],
      tagAutocompleteSuggestions: [],
      // selectedCards: [],
      selectedCard: null, //This should be an array of numbers. Fix this sometime
      tagFormFadeIn: false
    };
    this.toggleMassSearchError = this.toggleMassSearchError.bind(this);
    this.toggleMassTagError = this.toggleMassTagError.bind(this);
    this.toggleCardInSelected = this.toggleCardInSelected.bind(this);
    this.toggleTagForm = this.toggleTagForm.bind(this);
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

  componentWillUnmount()
  {
    // If the mass tagging component ever leaves the DOM, then the user has left the page and the data should be destroyed
    this.props.resetMassTaggingPool();
  }

  toggleTagForm() 
  {
    this.setState({tagFormFadeIn: !this.state.tagFormFadeIn});
  }
  
  getSuggestions(value) 
  {

    const escapedValue = escapeRegexCharacters(value.trim().replace(/[\s]/g, '_'));
    
    if (escapedValue === '') {
      return [];
    }
  
    const regex = new RegExp('^' + escapedValue, 'i');
    return this.props.globalTags.filter(tag => regex.test(tag.tag_name));
  }
  
  addTermToList()
  {
    // trim off any external whitespace and replace internal whitespace with underscores to conform with db schema
    let term = this.state.searchBarValue.trim().replace(/[\s]/g, '_');
    
    term && !this.state.selectedSearchTerms.includes(term) ?
    this.setState({selectedSearchTerms: this.state.selectedSearchTerms.concat(term)})
    : null;
    
    this.setState({searchBarValue: ''});
  }
  
  removeTermFromList(num)
  {
    let list = this.state.selectedSearchTerms;
    list.splice(num, 1);
    this.setState({selectedSearchTerms: list});
  }
  
  onChangeSearch = (event, { newValue, method }) => 
  {
    this.setState({searchBarValue: newValue});
  };

  onChangeTag = (event, { newValue, method }) => 
  {
    newValue;
    this.setState({tagBarValue: newValue});
  };

  onKeyPressSearch = (e) => 
  {
    if(e.key === 'Enter')
    {
      this.addTermToList();
    }
  }

  onKeyPressTag = (e) => 
  {
    if(e.key === 'Enter')
    {
      console.log('confirmed', this.state.tagBarValue);
    }
  }
  
  onSuggestionsFetchRequested = ({ value }) => 
  {
    this.setState({tagAutocompleteSuggestions: this.getSuggestions(value)});
  };

  onSuggestionsClearRequested = () => 
  {
    this.setState({tagAutocompleteSuggestions: []});
  };

  toggleMassSearchError()
  {
    this.setState({searchTooltipOpen: !this.state.searchTooltipOpen});
  };

  toggleMassTagError()
  {
    this.setState({tagTooltipOpen: !this.state.TagTooltipOpen});
  };

  normalSearchButtonFn()
  {
    // before searching, put any straggling search term into the array
    this.addTermToList();
    // package the search array in a format that the function understands
    // exclusive terms are not currently allowed in the mass tagging tool
    this.props.getSearchResultsTagTool(
      {
        inc: this.state.selectedSearchTerms,
        exc: []
      });
  }

  normalTagButtonFn()
  {
    const term = this.state.tagBarValue.trim().replace(/[\s]/g, '_');
    const pid = [this.state.selectedCard];
    if(term.length > 0)
    {
      this.props.applyTagToPool({term, pid});
    }
  }

  toggleCardInSelected(num)
  {
    // let currentCardNums = this.state.selectedCards.slice()
    let currentCardNum = this.state.selectedCard;
    // console.log(currentCardNums.includes(num));

    // if the number already exists, remove it
    // if(this.state.selectedCards.includes(num)){
    if(currentCardNum === num){
      // let index = currentCardNums.indexOf(num);
      // currentCardNums.splice(index, 1);
      // this.setState({selectedCards: currentCardNums});
      // if the mass tagging form is visible AND the last selected card was removed, toggle the form off
      this.setState({selectedCard: null})
      // if(this.state.tagFormFadeIn && currentCardNums.length <= 0)
      if(this.state.tagFormFadeIn && currentCardNum === null)
      {
        this.toggleTagForm();
      }
    }
    // otherwise, add it to the end of the list
    else {
      // currentCardNums.push(num);
      currentCardNum = num;
      // this.setState({selectedCards: currentCardNums});
      this.setState({selectedCard: currentCardNum});
      // if the mass tagging form is not visible, toggle the mass tagging form
      if(!this.state.tagFormFadeIn)
      {
        this.toggleTagForm();
      }
    }
    console.log('Selected Cards:', currentCardNum);
  }

  render() 
  {
    let squares = this.props.massTagSearchResults.map((e,i) => 
    {
      return <MassTagImgNode 
              className='square' 
              key={e.pid}
              id={e.pid}
              src={e.url.replace(/(\?alt)/,'-small?alt')} //convert image to thumbnail url
              alt={e.title}
              // isSelected={this.state.selectedCard.includes(e.pid)}
              selectedCardNum={this.state.selectedCard}
              selectCardFn={this.toggleCardInSelected}
              />
    });

    const { tagAutocompleteSuggestions, searchBarValue, tagBarValue } = this.state;
    const inputPropsSearch = 
    {
      placeholder: "Enter a search term",
      value: searchBarValue,
      onChange: this.onChangeSearch,
      onKeyPress: this.onKeyPressSearch
    };
    const inputPropsTag = 
    {
      placeholder: "Apply a tag to all images",
      value: tagBarValue,
      onChange: this.onChangeTag,
      onKeyPress: this.onKeyPressTag
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
    // 
    const normalTagButton = (<Button className="header-segment" color='primary' 
                                  onClick={() => {this.normalTagButtonFn()}}>
                                  Tag!</Button>);
    // disabledTagButton does not do anything, but displays a tooltip on mouseover or click
    const disabledTagButton = (<div><Tooltip placement="top" isOpen={this.state.tagTooltipOpen} target="TooltipMassTagError" toggle={this.toggleMassTagError}>
                                  Type in a term and hit Tag All to apply it</Tooltip>
                                  <Button id="TooltipMassTagError" className="header-segment"  color='primary'>
                                  Tag?</Button></div>); 

    return (
      <div className="tag-rules-block mobile-friendly">
        <div className='out'>
          <div className='in'>
            <div className='gui sticky'>
              {<div>
                <h5>Fast Tagging</h5>
                <div className='flex-row separate'>
                  {/* <span>{`Pictures Selected: ${this.state.selectedCards.length}`}</span> */}
                  <span>{`Selected: ${this.state.selectedCard ? `#${this.state.selectedCard}` : ''}`}</span>
                  <a style={{'color':'#5555FF', 'textDecoration':'underline'}} onClick={() => {
                    this.props.resetMassTaggingPool();
                    this.setState({selectedCards: [], selectedSearchTerms: []});
                    if(this.state.tagFormFadeIn){
                      this.toggleTagForm();
                    }
                  }}>Reset All</a>
                </div>
              </div>}
              <div className="search-bar-row"> {/* Inherited from the autocomplete stylesheet */}
              <Autosuggest 
                suggestions={tagAutocompleteSuggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputPropsSearch} />
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
              {/* Render each search term below the search bar */}
              {this.state.selectedSearchTerms.map((e, i) => {
                return (<div className='flex-row'>
                  <p className="green">{e.replace(/[_]/g, ' ')}</p>
                  <button onClick={() => this.removeTermFromList(i)}>x</button>
                  </div>)
              })}
              {/* Render a different button depending on if the user is capable of searching */}
              {(this.state.selectedSearchTerms.length > 0) || this.state.searchBarValue.trim() ? 
                normalSearchButton : disabledSearchButton}
              <Fade in={this.state.tagFormFadeIn}>
                <Autosuggest 
                suggestions={tagAutocompleteSuggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputPropsTag} />
                {/* {this.state.tagFormFadeIn ? (this.state.tagBarValue.trim() ? normalTagButton : disabledTagButton) : null} */}
                {normalTagButton}
              </Fade>
              
            </div>
          </div>
          <div className='wrap-box'>
            {squares}{/* Render search results */}
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
export default connect(mapStateToProps, { getAllPics, getListOfTags, getSearchResultsTagTool, resetMassTaggingPool, applyTagToPool })(MassTagging);