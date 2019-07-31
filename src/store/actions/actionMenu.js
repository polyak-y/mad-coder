import axios from 'axios'
import {OPENED, 
        RESET, 
        OPEN_MODAL, 
        CLOSE_MODAL, 
        ADD_VALUE, 
        AUTH_TRUE, 
        AUTH_FALSE, 
        CLEAR_INPUTS_TRUE,
        CLEAR_INPUTS_FALSE,
        ERROR_DATA,
        SUCCESS_DATA} from "./actionTypes";
import sha1 from 'sha1'


export function openMenu(open){
  return {
    type: OPENED,
    open: open  
  }
}

export function reset () {
  return {
    type: RESET
  }
}

export function openModal() {
  return {
    type: OPEN_MODAL
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  }
}

export function addValue(id, value) {
  return {
    type: ADD_VALUE,
    value: value,
    id: id
  }
}

export function auth(login, password) {

  return async (dispatch) => {

    try {
      const response = await axios.get('https://mad-coder.firebaseio.com/auth.json')
      if (response.data.login === sha1(login.trim()) && response.data.password === sha1(password.trim())) {       
        localStorage.setItem('login', sha1(login))
        localStorage.setItem('password', sha1(password))
        localStorage.setItem('loginName', login) 
        dispatch(authTrue())
        dispatch(closeModal())
      } else {
        dispatch(errorData())  
        
        setTimeout(()=>{
          dispatch(successData())
        },2000)
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export function authTrue(){
  return {
    type: AUTH_TRUE
  }
}

export function checkAuth() {
  return async (dispatch) => {

    try {
      const response = await axios.get("https://mad-coder.firebaseio.com/auth.json")
      if(localStorage.getItem('login') === response.data.login && localStorage.getItem('password') === response.data.password) {
        dispatch(authTrue())       
      } 
    } catch(e) {
      console.log(e);      
    }
  }
}

export function output() {
  return (dispatch) => {
    localStorage.removeItem("login")
    localStorage.removeItem("password")
    localStorage.removeItem("loginName")
    dispatch(authFalse()) 
  }
}

export function authFalse(){
  return {
    type: AUTH_FALSE
  }
}

export function emptyForm(){
  return (dispatch) => {
    dispatch(clearInputsTrue())

    setTimeout(() => {
      dispatch(clearInputsFalse())
    }, 2000) 
  }
}


export function clearInputsTrue() {
  return {
    type: CLEAR_INPUTS_TRUE
  }
}

export function clearInputsFalse() {
  return {
    type: CLEAR_INPUTS_FALSE
  }
}

export function errorData(){
  return {
    type: ERROR_DATA
  }
}

export function successData(){
  return {
    type: SUCCESS_DATA
  }
}

