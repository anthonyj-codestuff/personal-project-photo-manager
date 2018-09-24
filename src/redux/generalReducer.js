import axios from 'axios';

//CONSTANTS
const SEND_PIC_TO_DB = 'SEND_PIC_TO_DB';
const GET_ALL_PICS = 'GET_ALL_PICS';
const CLEAR_PREV_UPLOAD_DATA = 'CLEAR_PREV_UPLOAD_DATA';
const GET_PICTURE_BY_ID = 'GET_PICTURE_BY_ID';
const SET_SEARCH_TERMS_INC = 'SET_SEARCH_TERMS_INC';
const SET_SEARCH_TERMS_EXC = 'SET_SEARCH_TERMS_EXC';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const RESET_SEARCH_TOGGLE = 'RESET_SEARCH_TOGGLE';
const GET_LIST_OF_TAGS = 'GET_LIST_OF_TAGS';
const GET_LIST_OF_ALIASES = 'GET_LIST_OF_ALIASES';
const ADD_ALIAS = 'ADD_ALIAS';

//consider moving this to an EditDB reducer to keep things clean
const EDIT_PIC_TITLE = "EDIT_PIC_TITLE";
const EDIT_PIC_TAGS = "EDIT_PIC_TAGS";

// INITIAL APP STATE
const initialState = {
  picsDataObj: [], //holds data returned from the photos table. Currently only for the entire database.
  userNewUploads: [], //Same as before, but specifically for holding the user's newest uploads
  searchResults: [],  //holds the results of the user's most recent search
  globalTags:[], //holds a list of all tags in the db. Populated when the user opens the search modal
  lastSearchArr: {
    inc:[], 
    exc:[]},
  currentlyViewingSearchResults: false, //set to true by the search modal button (TODO). Reset by the header's gallery button
  aliasObj: []
};

//REDUCER
export default function generalReducer(state = initialState, action)
{
  switch(action.type)
  {
    //Sends a URL to the database and recieves an object containing picture details
    case `${SEND_PIC_TO_DB}_FULFILLED`:
      let newPicData = action.payload.data[0]
      console.log("newPicData", newPicData);
      return {
        ...state,
        //Add new picture data to state
        userNewUploads: [
          ...state.userNewUploads, newPicData
        ]
      };
    case `${SEND_PIC_TO_DB}_REJECTED`:
      console.log('Error - SEND_PIC_TO_DB_REJECTED');
      break;
    case `${GET_ALL_PICS}_FULFILLED`:
      //Gets contents of database row and adds it to the picData object. This should overwrite any existing contents
      console.log(action.payload.data)
      return {
        ...state,
        picsDataObj: action.payload.data
      };
    case `${GET_ALL_PICS}_REJECTED`:
      console.log('Error - GET_ALL_PICS_REJECTED');
      break;
    case `${CLEAR_PREV_UPLOAD_DATA}`: //When the user uploads a new batch of pictures, clear out the data of the previous batch before uploading
      return {
        ...state,
        userNewUploads: []
      };
    case `${GET_PICTURE_BY_ID}_FULFILLED`: 
      //unused as of 180910
      return {
        ...state,
        picsDataObj:action.payload.data
      };
    case `${GET_PICTURE_BY_ID}_REJECTED`:
      console.log('Error - GET_PICTURE_BY_ID_REJECTED');
      break;
    case `${SET_SEARCH_TERMS_INC}`:
      let newInc = {inc: state.lastSearchArr.inc.slice(),
                    exc: state.lastSearchArr.exc.slice()};
      // check the value before adding it to state
      console.log('action.payload', action.payload);
      action.payload ? 
      newInc.inc.push(action.payload) //ew
      : null;
      return {
        ...state,
        lastSearchArr: newInc
      };
    case `${SET_SEARCH_TERMS_EXC}`:
      let newExc = {inc: state.lastSearchArr.inc.slice(),
                    exc: state.lastSearchArr.exc.slice()};
      action.payload ? 
      newInc.exc.push(action.payload)
      : null;
      return {
        ...state,
        lastSearchArr: newExc
      };
    case `${GET_SEARCH_RESULTS}_FULFILLED`:
      return {
        ...state,
        searchResults: action.payload.data,
        currentlyViewingSearchResults: true
      };
    case `${GET_SEARCH_RESULTS}_REJECTED`:
      console.log('Error - GET_SEARCH_RESULTS_REJECTED');
      break;
    case `${RESET_SEARCH_TOGGLE}`: //Reverses the effects of GET_SEARCH_RESULTS
      return {
        ...state,
        searchResults: [],
        lastSearchArr: {inc: [], exc: []},
        currentlyViewingSearchResults: false
      };
    case `${GET_LIST_OF_TAGS}_FULFILLED`:
      return {
        ...state,
        globalTags: action.payload.data
      };
    case `${GET_LIST_OF_TAGS}_REJECTED`:
      console.log("Error - GET_LIST_OF_TAGS_REJECTED");
      return {
        ...state
      };
    case `${GET_LIST_OF_ALIASES}_FULFILLED`:
      return {
        ...state,
        aliases: action.payload.data
      };
    case `${GET_LIST_OF_ALIASES}_REJECTED`:
      console.log("Error - GET_LIST_OF_ALIASES_REJECTED");
      return {
        ...state
      };
      case `${ADD_ALIAS}_FULFILLED`:
      return {
        ...state
      }
    case `${ADD_ALIAS}_REJECTED`:
      console.log("Error - ADD_ALIAS_REJECTED");
      return {
        ...state
      }
    //Consider moving these to another reducer
    case `${EDIT_PIC_TITLE}_FULFILLED`:
      //This doesn't change state. The action creator just polls the db
      console.log("Title changed successfully");
      return {
        ...state
      };
    case `${EDIT_PIC_TITLE}_REJECTED`:
      console.log("Error - EDIT_PIC_TITLE_REJECTED");
      return {
        ...state
      };
    case `${EDIT_PIC_TAGS}_FULFILLED`:
      console.log("Tags updated successfully");
      return {
        ...state
      }
    case `${EDIT_PIC_TAGS}_REJECTED`:
      console.log("Error - EDIT_PIC_TAGS_REJECTED");
      return {
        ...state
      }
    default:
      console.log('Reached default state. Maybe something is pending.')
      return state;
  }
}

// ACTION CREATORS

export function sendPicToDB(url, uid){ 
  return {
    type: SEND_PIC_TO_DB,
    payload: axios.post('/api/submit', {url, uid}) //post request returns a data object with the pic's pid, url, and title
  }
}

export function getAllPics(){
  return { 
    type: GET_ALL_PICS,
    payload: axios.get('/api/photos')
  }
}

export function clearPrevUploadData(){//doesn't need a payload. It just empties data
  return {
    type: CLEAR_PREV_UPLOAD_DATA,
    payload: true
  };
}

// export function getPicByID() {
//   return {
//     type: GET_PICTURE_BY_ID,
//     payload: axios.get('/api/cart')
//   };
// }

export function setSearchTermsInclusive(terms){
  return {
    type: SET_SEARCH_TERMS_INC,
    payload: terms
  };
}

export function setSearchTermsExclusive(terms){
  return {
    type: SET_SEARCH_TERMS_EXC,
    payload: terms
  };
}

export function getSearchResults(terms){
  //Takes the two arrays of desired search parameters and constructs a query with them.
  // inclusive['nature','animal'], exclusive['dog','cat']
  // indicates that the user is searching for pictures of nature and animals, but not cats or dogs
  // resulting query: 'nature+animal+-dog+-cat'
  // deconstruct the query at the endpoint 
  let query = terms.inc.join('+') + '+' + terms.exc.map(e => '-' + e).join('+');
  return {
    type: GET_SEARCH_RESULTS,
    payload: axios.get(`/api/search?terms=${query}`)
  };
}

export function resetSearchToggle(){
  console.log(`resetSearchToggle()`);
  return {
    type: RESET_SEARCH_TOGGLE,
    payload: true
  };
}

export function getListOfTags(){
  return {
    type: GET_LIST_OF_TAGS,
    payload: axios.get('/api/tags/all')
  };
}

export function getListOfAliases(){
  return {
    type: GET_LIST_OF_ALIASES,
    payload: axios.get('/api/alias')
  };
}

export function addAlias(newAlias){
  return {
    type: ADD_ALIAS,
    payload: axios.post('/api/alias', newAlias)
  }
}

export function editPicTitle(titleObj){//takes in an object with a picture ID and a title
  console.log("Received", (titleObj ? titleObj.title : 'undefined')) //REMOVE: prevents the console for checking an object before it exists
  return {
    type: EDIT_PIC_TITLE,
    payload: axios.put('/api/edit_title', titleObj)
  };
}

export function editPicTags(tagsObj){
  // takes in an object with a picture ID and a string of space-delimited tags
  // splits string into an array of strings (by spaces) and sends the array to the db
  tagsObj ? tagsObj.tags = tagsObj.tags.split(' '): null;
  console.log("Received", (tagsObj ? tagsObj.tags : 'undefined'))
  return {
    type: EDIT_PIC_TAGS,
    payload: axios.put('/api/edit_tags', tagsObj)
  }
}