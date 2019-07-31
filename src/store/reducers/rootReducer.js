import {combineReducers} from 'redux'
import menuReducer from './menuReducer'
import newsReducer from './newsReducer'
import videoReducer from './videoReducer'
import homePageReducer from './homePageReducer'
import imgGaleryReducer from './imgGaleryReducer'
import mediaReducer from './mediaReducer'
import adminReducer from './adminReducer'


export default combineReducers({
  menuReducer: menuReducer,
  newsReducer: newsReducer,
  imgGaleryReducer: imgGaleryReducer,
  videoReducer: videoReducer,
  homePageReducer: homePageReducer,
  mediaReducer: mediaReducer,
  adminReducer: adminReducer
})