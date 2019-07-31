import Axios from "axios";
import {VIDEO_SUCCESS } from "./actionTypes";
import {disabledPrevFalse, 
        countPage, 
        paginationPrevKey, 
        paginationNextKey, 
        disabledNextTrue, 
        disabledNextFalse,
        disabledPrevTrue} from "./actionMedia";

export function listVideoOutput(id = false) {  
  return async (dispatch, getState) => { 
    
    try {
      let response 

      if(id === "nextButton") {
         response = await Axios.get(`https://mad-coder.firebaseio.com/video.json?orderBy="$key"&endAt="${getState().mediaReducer.nextPaginationKey}"&limitToLast=5`)
      } else if(id === "prevButton") {        
        response = await Axios.get(`https://mad-coder.firebaseio.com/video.json?orderBy="$key"&startAt="${getState().mediaReducer.prevPaginationKey}"&limitToFirst=5`)       
      }else if (id === false) {       
        response = await Axios.get('https://mad-coder.firebaseio.com/video.json?orderBy="$key"&limitToLast=5')   
      } else if(id === 'all') {
        response = await Axios.get('https://mad-coder.firebaseio.com/video.json') 
      } else {
        response = await Axios.get(`https://mad-coder.firebaseio.com/video/${id}.json`) 
      }

      let arrListVideo 
           
      if(id === 'nextButton' || id === "prevButton" || id === "all" || id === false) { //если получаем данные не одной новости
         arrListVideo = Object.keys(response.data).reverse() 
      } else  { //если получаем данные только одной новости
        arrListVideo = response.data
      }         
      
      if (id === "nextButton") {
        dispatch(disabledPrevFalse()) //разблокировали кнопку назад
        dispatch(countPage("+")) //плюсанули страницу
        dispatch(paginationPrevKey(getState().mediaReducer.nextPaginationKey)) //задали ключ для кнопки назад
        if(arrListVideo.length > 4) { //если список не закончился
          const delElem = arrListVideo.pop()  
          dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед 
        } else {
          dispatch(disabledNextTrue()) //блокируем кнопку вперед если это последняя страница
        }

      } else if (id === "prevButton") {
        dispatch(countPage("-")) //минусанули страницу

        if(getState().mediaReducer.disabledNext) { 
          dispatch(disabledNextFalse()) //разблокировка кнопки вперед
        }

        if(getState().mediaReducer.countPage === 1) {
          dispatch(disabledPrevTrue()) //если страница первая блокируем кнопку назад
        }
        
        dispatch(paginationNextKey(getState().mediaReducer.prevPaginationKey)) //то что было ключом для назад стало ключом для вперед  
        arrListVideo.pop()        
        dispatch(paginationPrevKey(arrListVideo[0])) //ключом для вперед сделали последний ключ массива
      } else if(id === false) {
        const delElem = arrListVideo.pop()  
        dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед
      }
                                                                             
      const videoList = []
      
      if(id === 'nextButton' || id === "prevButton" || id === "all" || id === false) { //если получаем данные не одной новости
        arrListVideo.forEach(elem => {
          videoList.push({
            id: elem,
            src:  response.data[elem].src,
            name:  response.data[elem].name
          })
        })
      } else { //если получаем данные только одной новости
        arrListVideo.id = id
        videoList[0] = arrListVideo 
      }
      dispatch(videoArrSuccess(videoList)) 

    } catch(e) {
      console.log(e)
    }
  }
}

export function videoArrSuccess(videoList) {
  return {
    type: VIDEO_SUCCESS,
    videoList: videoList
  }
}
