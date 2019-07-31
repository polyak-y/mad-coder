import {VIDEO_SUCCESS} from "../actions/actionTypes";

const initialState = {
  videoList: [],
}

export default function videoReducer(state = initialState, action) {
  switch(action.type) {

    case VIDEO_SUCCESS : 
      return {
        ...state,
        videoList: action.videoList
      }   
    
    default:
      return state
  }
}