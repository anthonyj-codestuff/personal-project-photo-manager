import axios from 'axios';

//CONSTANTS
const SEND_PIC_TO_DB = 'SEND_PIC_TO_DB';
const GET_PICTURE_BY_ID = 'GET_PICTURE_BY_ID';

// INITIAL APP STATE
const initialState = {
  picsDataObj: [] //holds data returned from the photos table. Created to hold the user's fresh uploads
};

//REDUCER
export default function generalReducer(state = initialState, action)
{
  switch(action.type)
  {
    //Sends a URL to the database and recieves an object containing picture details
    case `${SEND_PIC_TO_DB}_FULFILLED`:
      let newPicData = action.payload.data[0]
      console.log(newPicData);
      return {
        ...state,
        //Add new picture data to state
        picsDataObj: [
          ...state.picsDataObj, newPicData
        ]
      }
    case `${SEND_PIC_TO_DB}_REJECTED`:
      console.log('Error - SEND_PIC_TO_DB_REJECTED');
      break;
    case `${GET_PICTURE_BY_ID}_FULFILLED`: //takes in an array of objects (picture data from table 'photo')
      return {
        ...state,
        picsDataObj:action.payload.data
      };
    case `${GET_PICTURE_BY_ID}_REJECTED`:
      console.log('Error - GET_PICTURES_BY_ID_REJECTED');
      break;
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

// export function getPicByID() {
//   return {
//     type: GET_PICTURE_BY_ID,
//     payload: axios.get('/api/cart')
//   };
// }