import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Chat } from '@material-ui/icons';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import {withRouter} from 'react-router-dom'

const styles = {
  root: {
    width: '100%',
    justifyContent: 'center',
    borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
  }, 
  wrapper: {
    color: '#455A64'
  },
  activeWrapper: {
    color: '#43A047'
  }
};

class TopMenuAdmin extends React.Component {

  buttonClickHandler = (event) => {
    const {name} = event.currentTarget.dataset    
    this.props.history.push({pathname: `/admin/${name}`})    
  }
 
  render() {
    const { classes } = this.props;   
    let {location:{ pathname: path }} = this.props
    
    const wrapper = {
      wrapper: classes.wrapper
    }

    const activeWrapper = {
      wrapper: classes.activeWrapper
    }

    return (
      <BottomNavigation      
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction 
          data-name = "news/add"
          classes ={path.indexOf('news') !== -1 ? activeWrapper : wrapper}        
          label="Новости" 
          icon={<Chat />}
          onClick={this.buttonClickHandler}
        />
        
        <BottomNavigationAction 
          data-name = "img/add"
          classes ={path.indexOf('img') !== -1 ? activeWrapper : wrapper}        
          label="Фотогалерея" 
          icon={<PhotoLibrary />} 
          onClick={this.buttonClickHandler}
        />

        <BottomNavigationAction 
          data-name="video/add"
          classes ={path.indexOf('video') !== -1 ? activeWrapper : wrapper}  
          label="Видеогалерея" 
          icon={<VideoLibrary />} 
          onClick={this.buttonClickHandler}
        />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(TopMenuAdmin));