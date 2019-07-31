import { TWO_LAST_NEWS, LAST_IMAGE_HOMEPAGE, NEW_TWO_VIDEO_HOMEPAGE } from "../actions/actionTypes";

const initialState = {
  twoLastNews: [],
  lastImg: [],
  twoNewVideo: []
}

export default function homePageReducer(state = initialState, action)  {
  switch(action.type) {
    case TWO_LAST_NEWS :
      return {
        ...state,
        twoLastNews: action.twoLastNews
      }
    case LAST_IMAGE_HOMEPAGE : 
      return {
        ...state,
        lastImg: action.lastImgList
      }
    case NEW_TWO_VIDEO_HOMEPAGE : 
      return {
        ...state,
        twoNewVideo: action.twoVideoList
      }

    default : 
      return state
  }
}