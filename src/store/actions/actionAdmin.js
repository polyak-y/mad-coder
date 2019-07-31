import {ADD_VALUE_TEXTFIELD, 
        FILE_NAME, 
        CLEAR_ADD_NEWS, 
        SNAKBAR_OPEN, 
        SNAKBAR_CLOSE, 
        ADD_WIDTH_HEIGHT,
        BUTTON_OFF,
        BUTTON_ON} from "./actionTypes";
import axios from 'axios'
import { date } from "../../function/date";
import {noImg} from '../../variable/noImg'
import { listOutput } from "./actionNews";

export function addValueTextField(value, id) {
  return {
    type: ADD_VALUE_TEXTFIELD,
    id: id,
    value: value
  }
} 

export function photoName(fileName, file){
  return {
    type: FILE_NAME,
    fileName: fileName, 
    file: file
  } 
}

export function addNewsDatabase (title, text, url, fileName) {
  return async (dispatch) => { 
   
    const addNews = {
      createdAt: date(),
      imgSource: url, 
      text: text,
      title: title,
      photoName: fileName
    }
 
    try{
      await axios.post('https://mad-coder.firebaseio.com/news.json', addNews)
      let img = document.getElementById('imgRead')
      img.src = noImg
      dispatch(clearAddNews())
      dispatch(buttonOn())
    } catch(e){
      console.log(e);      
    }
  }
}
 
export function editNewsDatabase (id, title, text, url, fileName) {
  return async (dispatch) => { 

    let editNews 
   
    if(url && fileName) {
      editNews = {
        createdAt: date(),
        imgSource: url, 
        text: text,
        title: title,
        photoName: fileName
      }
    } else {
      editNews = {
        createdAt: date(),        
        text: text,
        title: title,
      }
    }  
 
    try{
      await axios.patch(`https://mad-coder.firebaseio.com/news/${id}.json`, editNews)
      dispatch(listOutput('all'))
      dispatch(buttonOn())      
    } catch(e){
      console.log(e);      
    }
  }
}

export  function addImgGalery(width, height, url, fileName) {
  return async (dispatch) => {
    const addImgGalery = {
      createdAt: date(),
      src: url, 
      width: width,
      height: height,
      photoName: fileName
    }

    try{
      await axios.post('https://mad-coder.firebaseio.com/galery.json', addImgGalery)
      let img = document.getElementById('imgRead')
      img.src = noImg
      dispatch(clearAddNews())
      dispatch(buttonOn())
    } catch(e){
      console.log(e);      
    }
  }
}

export  function addVideo(nameVideo, srcVideo) {
  return async (dispatch) => {
    const  objVideo = {
      name: nameVideo,
      src: srcVideo
    }
    try {
      await axios.post('https://mad-coder.firebaseio.com/video.json', objVideo)
      dispatch(buttonOn())
    } catch(e){
      console.log(e);      
    }
  }
}

export function clearAddNews() {
  return {
    type: CLEAR_ADD_NEWS
  }
}

export function snackBarOpen(variant, message){
  return {
    type: SNAKBAR_OPEN,
    variant: variant,
    message: message
  }
}

export function snackBarClose(){
  return {
    type: SNAKBAR_CLOSE
  }
}

export function addWidthHeight(name, value) {
  return {
    type: ADD_WIDTH_HEIGHT,
    name: name,
    value: value
  }
}

export function buttonOff(){
  return {
    type: BUTTON_OFF
  }
}
export function buttonOn(){
  return {
    type: BUTTON_ON
  }
}
