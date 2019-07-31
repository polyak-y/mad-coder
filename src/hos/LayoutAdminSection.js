import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import SideBar from '../UI/SideBar/SideBar';
import {withRouter} from 'react-router-dom';

const styles = () => ({
  mainSection: {
    display: 'grid',
    gridTemplateColumns: '360px 1fr',
    width: '100%',
  }, 
})

 class LayoutAdminSection extends Component {

  render() {
    
    const {classes, location: {pathname}} = this.props
    let add, edit, deleteSection
    if(pathname.indexOf('news') !== -1) {
      add = "news/add"
      edit = "news/edit"
      deleteSection = "news/delete"
    } else if (pathname.indexOf('img') !== -1){
      add = "img/add"     
      deleteSection = "img/delete"
    } else {
      add = "video/add"
      edit = "video/edit"
      deleteSection = "video/delete"
    }

    return (       
      <div  className={classes.mainSection}>
        <div className={classes.sidebar}>
          <SideBar add={add} edit={edit} delete={deleteSection}/>
        </div>    
        <div className={classes.contentSection}>
          {this.props.children}
        </div>        
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(LayoutAdminSection))