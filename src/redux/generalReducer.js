import axios from 'axios';

//CONSTANTS
const SEND_PIC_TO_DB = 'SEND_PIC_TO_DB';
const SET_PICTURE_IDS = 'SET_PICTURE_IDS';
// const GET_PICTURES_BY_ID = 'GET_PICTURES_BY_ID';

// INITIAL APP STATE
const initialState = {
  pictureIDs: [], //holds integer picture ids. Created for holding the user's new uploads
  picsDataObj: [] //holds data returned from the photos table
};

//REDUCER
export default function generalReducer(state = initialState, action)
{
  switch(action.type)
  {
    case `${SEND_PIC_TO_DB}_FULFILLED`:
      let newPid = action.payload.data[0].pid
      console.log(state.pictureIDs);
      return {
        ...state,
        pictureIDs: [
          ...state.pictureIDs, newPid
        ]
      }
    case `${GET_PICTURES_BY_ID}_FULFILLED`: //takes in an array of objects (picture data from table 'photo')
      return {
        ...state,
        picsDataObj:action.payload.data
      };
    default:
      return state;
  }
}

// ACTION CREATORS

export function sendPicToDB(url, uid)
{ 
  return {
    type: SEND_PIC_TO_DB,
    payload: axios.post('/api/submit', {url, uid}) //post request returns an picture id int
  }
}

// export function getPicsByID() {
//   return {
//     type: GET_PICTURES_BY_ID,
//     payload: axios.get('/api/cart')
//   };
// }