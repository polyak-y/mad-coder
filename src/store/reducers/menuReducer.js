import { OPENED, 
        OPEN_MODAL, 
        CLOSE_MODAL, 
        ADD_VALUE, 
        AUTH_TRUE, 
        AUTH_FALSE, 
        CLEAR_INPUTS_TRUE,
        CLEAR_INPUTS_FALSE,
        ERROR_DATA,
        SUCCESS_DATA} from "../actions/actionTypes";

const initialState = {
  left: false,
  open: false,
  VPloginInput: '',
  VPpswInput: '',
  auth: null,
  clearInputs: false,
  errorData: false
}

export default function siteReducer(state = initialState, action)  {
  switch(action.type) {

    case OPENED: 
      return {
        ...state,
        left: action.open
      }    
    
    case OPEN_MODAL :
      return {
        ...state,
        open: true
      }
    
    case CLOSE_MODAL : 
      return {
        ...state,
        open: false
      }
    
      case ADD_VALUE : 
        return {
          ...state,
          [action.id]: action.value
        }
      
      case AUTH_TRUE : 
        return {
          ...state,
          auth: true,
          VPloginInput: '',
          VPpswInput: ''
        }

      case AUTH_FALSE : 
        return {
          ...state,
          auth: false
        }
      
      case CLEAR_INPUTS_TRUE : 
        return {
          ...state,
          clearInputs: true
        }      

      case CLEAR_INPUTS_FALSE : 
        return {
          ...state,
          clearInputs: false
        }
      
      case ERROR_DATA : 
        return {
          ...state,
          errorData: true
        }
      
      case SUCCESS_DATA : 
        return {
          ...state,
          errorData: false
        }

    default : 
      return state
  }
}