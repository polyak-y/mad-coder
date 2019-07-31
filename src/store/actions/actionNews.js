import axios from 'axios'
import {LOAD_LIST_NEWS, 
        LOAD_ONE_NEWS,
        EDIT_NEWS_VALUE,
        BACK_IN_USSR_FALSE} from './actionTypes'
import {countPage, 
        disabledPrevFalse, 
        paginationPrevKey,
        paginationNextKey,
        disabledNextTrue,
        disabledNextFalse,
        disabledPrevTrue} from './actionMedia';


export function listOutput(id = false) {
  
  return async (dispatch, getState) => {
    
    try{
     
      let response 

      if(id === "nextButton") {
         response = await axios.get(`https://mad-coder.firebaseio.com/news.json?orderBy="$key"&endAt="${getState().mediaReducer.nextPaginationKey}"&limitToLast=5`)
      } else if(id === "prevButton") {        
        response = await axios.get(`https://mad-coder.firebaseio.com/news.json?orderBy="$key"&startAt="${getState().mediaReducer.prevPaginationKey}"&limitToFirst=5`)       
      } else if(id === 'all') {
        response = await axios.get('https://mad-coder.firebaseio.com/news.json')     
      } else if (id === false && getState().mediaReducer.backinussr === false){       
        response = await axios.get('https://mad-coder.firebaseio.com/news.json?orderBy="$key"&limitToLast=5')         
      } else if(id === false && getState().mediaReducer.backinussr === true) {
        response = await axios.get(`https://mad-coder.firebaseio.com/news.json?orderBy="$key"&endAt="${getState().mediaReducer.prevPaginationKey}"&limitToLast=5`)   
      }

      const arrListNews = Object.keys(response.data).reverse()   
      
      if(id === "nextButton") {
        dispatch(disabledPrevFalse()) //разблокировали кнопку назад
        dispatch(countPage("+")) //плюсанули страницу
        dispatch(paginationPrevKey(getState().mediaReducer.nextPaginationKey)) //задали ключ для кнопки назад

        if(arrListNews.length > 4) { //если список не закончился
          const delElem = arrListNews.pop()  
          dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед 
        } else {
          dispatch(disabledNextTrue()) //блокируем кнопку вперед если это последняя страница
        }

      } else if (id === "prevButton") {
        dispatch(countPage("-")) //минусанули страницу

        if(getState().mediaReducer.disabledNext) { //мы кликнули назад и если кнопка вперед заблокирована то...
          dispatch(disabledNextFalse()) //разблокировка кнопки вперед
        }

        if(getState().mediaReducer.countPage === 1) {
          dispatch(disabledPrevTrue()) //если страница первая блокируем кнопку назад
        }
        
        dispatch(paginationNextKey(getState().mediaReducer.prevPaginationKey)) //то что было ключом для назад стало ключом для вперед  
        arrListNews.pop()        
        dispatch(paginationPrevKey(arrListNews[0])) //ключом для вперед сделали последний ключ массива
      } else if(id === false) {
        
        if(arrListNews.length > 4) {
          const delElem = arrListNews.pop()  
          dispatch(paginationNextKey(delElem)) //сохранили ключ для кнопки вперед
        }
      }

      const listNews = []
      arrListNews.forEach((key)=> {
        listNews.push({
          id: key,
          title: response.data[key].title,
          imgSource: response.data[key].imgSource,
          text: response.data[key].text,
          photoName: response.data[key].photoName,
        }) 
      })

      dispatch(newsArrSuccess(listNews))
      dispatch(backInUssrFalse())   
    } catch(e) {
      console.log(e)
    }
  }
}

export function newsArrSuccess(listNews) {
  return {
    type: LOAD_LIST_NEWS,
    listNews: listNews
  }
}

export function listOutputOneNews(id) {
  return async (dispatch) => { 

    try{
      const response = await axios.get(`https://mad-coder.firebaseio.com/news/${id}.json`) //response.data - объект внутри которого массивы с объектами
      
      const listOneNews = [{
        id: id,
        title: response.data.title,
        imgSource: response.data.imgSource,
        text: response.data.text,
        photoName: response.data.photoName
      }]

      dispatch(OneNewsSuccess(listOneNews))          
     
    } catch(e) {
      console.log(e) 
    }
  }
}

export function OneNewsSuccess(listOneNews) {
  return {
    type: LOAD_ONE_NEWS,
    listOneNews: listOneNews
  }
}

export function editNewsValue(id, value) {
  return {
    type: EDIT_NEWS_VALUE,
    id: id,
    value: value
  }
}

export function deleteNews (id) {
  return async (dispatch) => {
    try {
      await axios.delete(`https://mad-coder.firebaseio.com/news/${id}.json`)  
      dispatch(listOutput('all'))
    } catch (e) {
      console.log(e);      
    }
  }
}

export function backInUssrFalse() {
  return {
    type: BACK_IN_USSR_FALSE
  }
}
