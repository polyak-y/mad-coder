import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Home from '@material-ui/icons/Home';
import Chat from '@material-ui/icons/Chat';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import SentimentVerySatisfied from '@material-ui/icons/SentimentVerySatisfied';

import {connect} from 'react-redux'
import { openMenu, reset } from '../../store/actions/actionMenu';
import {withRouter} from 'react-router-dom'


const styles = {
  list: {
    width: 250,
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff'
  },
  menuItem: {
    padding: 0,
    
  },
  colorText: {
    '& span': {
      color: '#fff'
    }
  },
  iconWhite: {
    fill: '#fff'
  }, 
  bottomLine: {
    backgroundColor: '#444242'
  }
};

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class TemporaryDrawer extends React.Component {
  
  toggleDrawer = (open) => () => {
    this.props.openMenu(open)
  };

  clickHandler = (path) => {
    this.props.history.push({pathname: path})
    this.props.reset()
  }

  render() {
    
    const { classes } = this.props;
    
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >

            <div className={classes.list}>
              <List className={classes.menuItem} onClick={() => this.clickHandler('/') } >
                <ListItem button >
                  <ListItemIcon ><Home className={classes.iconWhite}/></ListItemIcon>
                  <ListItemText className={classes.colorText} primary="Главная" />
                </ListItem>
              </List>
              <Divider className={classes.bottomLine} />
              

              <List className={classes.menuItem} onClick={() => this.clickHandler('/news')}>
                <ListItem button >
                  <ListItemIcon ><Chat className={classes.iconWhite}/></ListItemIcon>
                  <ListItemText className={classes.colorText} primary="Новости" />
                </ListItem>
              </List>
              <Divider className={classes.bottomLine} />

              <List className={classes.menuItem} onClick={() => this.clickHandler('/imggalery')}>
                <ListItem button >
                  <ListItemIcon ><PhotoLibrary className={classes.iconWhite}/></ListItemIcon>
                  <ListItemText className={classes.colorText} primary="Фотогалерея" />
                </ListItem>
              </List>
              <Divider className={classes.bottomLine} />
 
              <List className={classes.menuItem} onClick={() => this.clickHandler('/videogalery')}>
                <ListItem button >
                  <ListItemIcon ><VideoLibrary className={classes.iconWhite}/></ListItemIcon>
                  <ListItemText className={classes.colorText} primary="Видеогалерея" />
                </ListItem> 
              </List>
              <Divider className={classes.bottomLine} />

              {
                this.props.auth 
                  ? <React.Fragment>
                      <List className={classes.menuItem} onClick={() => this.clickHandler('/admin/news/add')}>
                        <ListItem button >
                          <ListItemIcon ><SentimentVerySatisfied className={classes.iconWhite} /></ListItemIcon>
                          <ListItemText className={classes.colorText} primary="Админка" />
                        </ListItem>
                      </List>
                      <Divider className={classes.bottomLine} />
                    </React.Fragment>
                  : null
              }
            </div> 
          </div>
        </Drawer>   
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    open: state.menuReducer.left,
    auth: state.menuReducer.auth
  }
} 

function mapDispatchToProps (dispatch) {
  return {
    openMenu: (open) => dispatch(openMenu(open)),
    reset: () => dispatch(reset()) //сброс ключей и номера страниц
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(TemporaryDrawer)));
