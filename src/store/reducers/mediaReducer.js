import {PLUS_PAGE, 
        MINUS_PAGE, 
        DISABLED_PREV_FALSE, 
        SAVE_PREV_KEY,
        SAVE_NEXT_KEY,
        DISABLED_NEXT_TRUE,
        DISABLED_NEXT_FALSE,
        DISABLED_PREV_TRUE,        
        RESET,
        BACK_IN_USSR,
        BACK_IN_USSR_FALSE,
        HOME_PAGE_NEWS,
        HOME_PAGE_NEWS_FALSE} from "../actions/actionTypes";

const initialState = {
  nextPaginationKey: null,
  prevPaginationKey: null,
  disabledPrev: true,
  disabledNext: false,
  countPage: 1,
  visible: false,
  backinussr: false,
  homePageTwoNews: false,
}
 
export default function mediaReducer(state = initialState, action) {
  switch(action.type) {

  case PLUS_PAGE : 
    return {
      ...state,
      countPage: state.countPage + 1
    }    

  case MINUS_PAGE : 
    return {
      ...state,
      countPage: state.countPage - 1
    }   
  
  case DISABLED_PREV_FALSE : 
    return {
      ...state,
      disabledPrev: false
    }
  
    case SAVE_PREV_KEY : 
    return {
      ...state,
      prevPaginationKey: action.lastElem
    }

    case SAVE_NEXT_KEY : 
      return {
        ...state,
        nextPaginationKey: action.lastKey
      }   
    
    case DISABLED_NEXT_TRUE: 
      return {
        ...state,
        disabledNext: true
      }
    
    case DISABLED_NEXT_FALSE : 
      return {
        ...state,
        disabledNext: false
      }
    
    case  DISABLED_PREV_TRUE :
      return { 
        ...state,
        disabledPrev: true
      }  
    
    case RESET : 
      return {
        ...state,
        nextPaginationKey: null,
        prevPaginationKey: null,
        disabledPrev: true,
        disabledNext: false,
        countPage: 1 
      }
    
    case BACK_IN_USSR : 
      return {
        ...state,
        backinussr: true,
      }

    case BACK_IN_USSR_FALSE : 
      return {
        ...state,
        backinussr: false,
      }
    
    case HOME_PAGE_NEWS : 
      return {
        ...state,
        homePageTwoNews: true,
      }
   
      case HOME_PAGE_NEWS_FALSE : 
      return {
        ...state,
        homePageTwoNews: false,
      }

    default:
      return state
  }
}