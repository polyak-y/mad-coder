import Axios from "axios";
import { TWO_LAST_NEWS, LAST_IMAGE_HOMEPAGE, NEW_TWO_VIDEO_HOMEPAGE } from "./actionTypes";

export function dataLastOutput() {
  
  return async (dispatch) => {  

    try{
      /* ===========две новые статьи===================== */
      const responseNews = await Axios.get('https://mad-coder.firebaseio.com/news.json?orderBy="createdAt"&limitToLast=2') 

      let twoLastNews = []

      Object.keys(responseNews.data).forEach((key)=> {
        twoLastNews.push({
          id: key,
          title: responseNews.data[key].title,
          imgSource: responseNews.data[key].imgSource,
          text: responseNews.data[key].text,
        }) 
      })
   
      dispatch(twoLastNewsSuccess(twoLastNews)) 

      /* ==============новые картинки================== */
      const responseGalery = await Axios('https://mad-coder.firebaseio.com/galery.json?orderBy="createdAt"&limitToLast=3')

      let lastImgList = []

      Object.entries(responseGalery.data).forEach(([key, obj]) => {
        lastImgList.push({
          id: key,
          height: +obj.height,
          width: +obj.width,
          src: obj.src
        })
      })      
      dispatch(lastImgArrSuccess(lastImgList)) 
      /* ==============новые видео================== */
      const responseVideo = await Axios('https://mad-coder.firebaseio.com/video.json?orderBy="createdAt"&limitToLast=2')
      const twoVideoList = []

      Object.entries(responseVideo.data).forEach(([key, obj]) => {
        twoVideoList.push({
          id: key,
          src: obj.src,
          name: obj.name
        })
      })

      dispatch(videoArrSuccess(twoVideoList))
          
    } catch(e) {
      console.log(e)
    }
  }
}

export function twoLastNewsSuccess(twoLastNews) {
  return {
    type: TWO_LAST_NEWS,
    twoLastNews: twoLastNews
  }
}

export function lastImgArrSuccess(lastImgList) {
  return {
    type: LAST_IMAGE_HOMEPAGE,
    lastImgList: lastImgList
  }
}

export function videoArrSuccess(twoVideoList) {
  return {
    type: NEW_TWO_VIDEO_HOMEPAGE,
    twoVideoList: twoVideoList
  }
} 