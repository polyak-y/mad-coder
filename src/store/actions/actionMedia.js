import {PLUS_PAGE, 
        MINUS_PAGE, 
        DISABLED_PREV_FALSE, 
        SAVE_PREV_KEY,
        SAVE_NEXT_KEY,
        DISABLED_NEXT_TRUE,
        DISABLED_NEXT_FALSE,
        DISABLED_PREV_TRUE,        
        BACK_IN_USSR,
        HOME_PAGE_NEWS,
        HOME_PAGE_NEWS_FALSE} from "./actionTypes"; 

 export function countPage(znak) { //плюс/минус номер страницы
  if(znak === "+") {
    return {type: PLUS_PAGE}
  } else {
    return {type: MINUS_PAGE}
  }
}

export function disabledPrevFalse() { //разблокировка кнопки назад
  return {
    type: DISABLED_PREV_FALSE
  }
}

export function paginationPrevKey(lastElem){ //задали ключ для кнопки назад
  return {
    type: SAVE_PREV_KEY,
    lastElem: lastElem
  }
}

export function paginationNextKey(delElem) { //сохранили ключ для кнопки вперед 
  return {
    type: SAVE_NEXT_KEY,
    lastKey: delElem
  }
}

export function disabledNextTrue() { //блокируем кнопку вперед если это последняя страница
  return {
    type: DISABLED_NEXT_TRUE
  }
}

export function disabledNextFalse() {  //разблокировка кнопки вперед
  return {
    type: DISABLED_NEXT_FALSE
  }
}

export function disabledPrevTrue() { //если страница первая блокируем кнопку назад
  return {
    type: DISABLED_PREV_TRUE
  }
}

export function backInUssr() {
  return {
    type: BACK_IN_USSR
  }
}

export function homePageTwoNews() {
  return {
    type: HOME_PAGE_NEWS
  }
}

export function homePageNewsFalse(){
  return {
    type: HOME_PAGE_NEWS_FALSE
  }
}


