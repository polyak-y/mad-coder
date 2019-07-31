import React from 'react';
import {Route, Switch} from 'react-router-dom' 
import LayoutAdminSection from '../../hos/LayoutAdminSection'
import NewsAdd from './News/NewsAdd';
import NewsEdit from './News/NewsEdit';
import NewsDelete from './News/NewsDelete';
import ImgGaleryAdd from './ImgGalery/ImgGaleryAdd';
import ImgGaleryDelete from './ImgGalery/ImgGaleryDelete';
import VideoAdd from './Video/VideoAdd';
import VideoEdit from './Video/VideoEdit';
import VideoDelete from './Video/VideoDelete';
import NewsEditOne from './News/NewsEditOne';
import VideoEditOne from './Video/VideoEditOne';
import Page404 from '../../UI/Page404/Page404';


const News = () => {

  return (  
    <LayoutAdminSection>    
      <Switch>
        <Route path='/admin/video/edit/:id'  component={VideoEditOne}/>
        <Route path='/admin/news/edit/:id'  component={NewsEditOne}/> 

        <Route path='/admin/news/add'  component={NewsAdd}/>              
        <Route path='/admin/img/add'  component={ImgGaleryAdd}/> 
        <Route path='/admin/video/add'  component={VideoAdd}/>      
        
        <Route path='/admin/news/edit'  component={NewsEdit}/> 
        <Route path='/admin/video/edit'  component={VideoEdit}/>        

        <Route path='/admin/news/delete'  component={NewsDelete}/>              
        <Route path='/admin/img/delete'  component={ImgGaleryDelete}/>              
        <Route path='/admin/video/delete'  component={VideoDelete}/> 

        <Route component={Page404}  />            
      </Switch>    
    </LayoutAdminSection>
  )
}

export default News