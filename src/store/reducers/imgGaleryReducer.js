import { IMG_SUCCESS } from "../actions/actionTypes";

const initialState = {
  imgList: [],
}

export default function imgGaleryReducer (state = initialState, action)  {
  switch(action.type) {

    case IMG_SUCCESS : 
      return {
        ...state,
        imgList: action.imgList 
      }  

    default : 
      return state
  }
}