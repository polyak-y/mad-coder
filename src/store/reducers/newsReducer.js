import {LOAD_LIST_NEWS, 
        LOAD_ONE_NEWS, 
        EDIT_NEWS_VALUE} from "../actions/actionTypes";

const initialState = {
  listNews: [],
  oneNews: [],
  inputAdminTitile: '',
  textareaAdminText: '',
  photoName: ''
}

export default function newsReducer(state = initialState, action)  {
  switch(action.type) {
    case LOAD_LIST_NEWS : 
      return {
        ...state,
        listNews: action.listNews
      }  
    case LOAD_ONE_NEWS : 
      return {
        ...state,
        oneNews: action.listOneNews,
        inputAdminTitile: action.listOneNews[0].title,
        textareaAdminText: action.listOneNews[0].text,
        photoName: action.listOneNews[0].photoName
      }
    case EDIT_NEWS_VALUE : 
      return {
        ...state,
        [action.id] : action.value
      }

    default : 
      return state
  }
} 