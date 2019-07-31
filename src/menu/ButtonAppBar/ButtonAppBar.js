import React from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {connect} from 'react-redux'
import TemporaryDrawer from '../TemporaryDraw/TemporaryDrawer'
import { openMenu, openModal, checkAuth } from '../../store/actions/actionMenu';
import Monster from '../../svg/Monster';
import SimpleModal from '../../UI/Modal/Modal'
import Avatars from '../../UI/Avatars/Avatars';
import MenuLogin from '../../UI/MenuLogin/MenuLogin'
import { Tooltip } from '@material-ui/core';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: '10px'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  customWidth: {
    width: 100,
    textAlign: 'center'
  }
};

const theme = createMuiTheme({ 
  palette: {
    primary: {
      main: '#455A64', 
    },
    secondary: {
      main: '#ccc'
    }
  },
  typography: {
    useNextVariants: true,
  } 
});

class  ButtonAppBar extends React.Component {
  
  componentDidMount(){
    this.props.checkAuth()
  }

  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="Menu"
                  onClick={() => this.props.openMenu(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Monster />
                <Typography variant="h6" color="inherit" className={classes.grow}>
                  Mad Coder 
                </Typography>
              
                  {this.props.auth === true
                    ? <div className={classes.rightBlock}><Avatars src={require('../../img/auth/admin.jpg')} /> <strong style={{cursor: 'pointer'}}><MenuLogin name={localStorage.getItem('loginName')} /></strong></div> 
                    : <Tooltip title="логин: admin пароль: 12345" classes={{ tooltip: classes.customWidth }} placement="bottom">
                        <Button color="inherit" onClick={this.props.openModal}>Войти</Button>  
                      </Tooltip>            
                  }             
              </Toolbar>
            </AppBar>
          </div>
        </MuiThemeProvider>
        <TemporaryDrawer />
        <SimpleModal />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.menuReducer.auth,   
    loginName: state.menuReducer.loginName
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openMenu: (open) => dispatch(openMenu(open)),
    openModal: () => dispatch(openModal()),
    checkAuth: () => dispatch(checkAuth())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ButtonAppBar));
