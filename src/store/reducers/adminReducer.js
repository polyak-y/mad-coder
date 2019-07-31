import {ADD_VALUE_TEXTFIELD, 
        FILE_NAME, 
        CLEAR_ADD_NEWS, 
        SNAKBAR_OPEN, 
        SNAKBAR_CLOSE, 
        ADD_WIDTH_HEIGHT,
        BUTTON_ON,
        BUTTON_OFF} from "../actions/actionTypes";

const initialState = {
  inputAdminTitile: '',
  textareaAdminText: '',
  fileName: '',
  file: null,
  open: false,
  variant: 'success',
  message: '', 
  width: '',
  height : '',
  disabled: false,
  adminSideBar: {
    add: "news/add",
    edit: "news/edit",
    deleteSection: "news/delete",
  }
}

export default function adminReducer(state = initialState, action) {
  switch(action.type) {

    case ADD_VALUE_TEXTFIELD : 
      return {
        ...state,
       [ action.id]: action.value
      }
    
    case FILE_NAME : 
      return {
        ...state,
        fileName: action.fileName,
        file: action.file
      }

    case CLEAR_ADD_NEWS :
      return {
        ...state,
        inputAdminTitile: '',
        textareaAdminText: '',
        fileName: '',
        file: null,
        width: '',
        height: '',       
      }

    case SNAKBAR_OPEN : 
      return {
        ...state,
        open: true,
        variant: action.variant,
        message: action.message
      }

    case SNAKBAR_CLOSE : 
      return {
        ...state,
        open: false
      }      
  
    case ADD_WIDTH_HEIGHT: 
      return {
        ...state,
        [action.name]: action.value
      }
    
      case BUTTON_OFF: 
        return {
          ...state,
          disabled: true
        }
      
      case BUTTON_ON: 
        return {
          ...state,
          disabled: false
        }  

    default:
      return state
  }
}