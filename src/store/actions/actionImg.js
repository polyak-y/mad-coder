import axios from "axios";
import { IMG_SUCCESS } from "./actionTypes";
/* import {outputImagesGalery} from '../../function/outputImages' */
import {disabledPrevFalse, 
        countPage, 
        paginationPrevKey,
        paginationNextKey,
        disabledNextTrue,
        disabledNextFalse,
        disabledPrevTrue} from "./actionMedia";

export function listImgOutput(id = false) {
  return async (dispatch, getState) => {   

    try { 
      let response

      if(id === "nextButton") {
         response = await axios.get(`https://mad-coder.firebaseio.com/galery.json?orderBy="$key"&startAt="${getState().mediaReducer.nextPaginationKey}"&limitToFirst=9`) //если нажата кнопка вперед
      } else if(id === "prevButton") {        
        response = await axios.get(`https://mad-coder.firebaseio.com/galery.json?orderBy="$key"&endAt="${getState().mediaReducer.prevPaginationKey}"&limitToLast=9`) //если нажата кнопка назад          
      }else if(id === false) {       
        response = await axios.get('https://mad-coder.firebaseio.com/galery.json?orderBy="$key"&limitToFirst=9') //если просто загружается без нажатии кнопки         
      } else if(id === 'all') {
        response = await axios.get('https://mad-coder.firebaseio.com/galery.json') //загружаем весь список      
      }

      const imgList = []
      const arrListImg = Object.keys(response.data)  
      
      if(id === "nextButton") {
        dispatch(disabledPrevFalse()) //разблокировали кнопку назад
        dispatch(countPage("+")) //плюсанули страницу
        
        dispatch(paginationPrevKey(getState().mediaReducer.nextPaginationKey)) //задали ключ для кнопки назад

        if(arrListImg.length > 8) { //если список не закончился
          const delElem = arrListImg.pop()  
          dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед 
        } else {
          dispatch(disabledNextTrue()) //блокируем кнопку вперед если это последняя страница
        }

      } else if (id === "prevButton") {
        dispatch(countPage("-")) //минусанули страницу

        if(getState().mediaReducer.disabledNext) { //если кнопка вперед заблокированан при нажатии назад 
          dispatch(disabledNextFalse()) //разблокировка кнопки вперед
        }

        if(getState().mediaReducer.countPage === 1) { //если первая страница блокируем кнопку назад
          dispatch(disabledPrevTrue())
        }
        
        dispatch(paginationNextKey(getState().mediaReducer.prevPaginationKey)) //то что было ключом для назад стало ключом для вперед  
        arrListImg.pop()        
        dispatch(paginationPrevKey(arrListImg[0])) //ключом для вперед сделали последний ключ массива
      } else if (id === false) {
        const delElem = arrListImg.pop()  
        dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед        
      }  

      
      arrListImg.forEach((elem) => {
        imgList.push({
          id: elem,
          height: +response.data[elem].height,
          width:  +response.data[elem].width,
          src: response.data[elem].src,
          photoName: response.data[elem].photoName,
        })         
      })     
     
      dispatch(imgArrSuccess(imgList))   
            
    } catch(e) {
      console.log(e) 
    }
  }
}

export function imgArrSuccess(imgList) {
  return {
    type: IMG_SUCCESS,
    imgList: imgList
  }
}

export function deleteImg (id) {
  return async (dispatch) => {
    try {
      await axios.delete(`https://mad-coder.firebaseio.com/galery/${id}.json`)  
      dispatch(listImgOutput('all'))
    } catch (e) {
      console.log(e);      
    }
  }
}

