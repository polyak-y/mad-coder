import React, { Component } from 'react'
import { withStyles, IconButton } from '@material-ui/core';
import {connect} from 'react-redux'
import { listVideoOutput } from '../../../store/actions/actionVideo';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import MyPopover from '../../../UI/MyPopover/MyPopover';
import axios from 'axios';
import { snackBarOpen } from '../../../store/actions/actionAdmin';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'


const style = () => ({
  mainVideo: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    height: '100%',
    position: 'relative'
  },
  mainOneVideo: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    paddingLeft: 3,
    borderBottom: '1px solid lightgray',
    transition: 'background .3s ease-in-out',

    "&:hover": {
      background:' rgba(255, 99, 71, .1)'
    }
  },
  button: {
    color: 'tomato',    
  },
  textTitle: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: 'bold'
  }
})

 class VideoDelete extends Component {

  state = {
    anchorEl: null,
    idVideo: "",
    preloader: true
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      idVideo: event.currentTarget.id,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  renderList = () => {
    const {videoList, classes} = this.props
    return videoList.map((elem, index) => {
      return(
        <div key={elem.id} data-id={elem.id} className={classes.mainOneVideo} >
          <span>{index + 1})</span>
          <p className={classes.textTitle}>{elem.name}</p>
          <IconButton  className={classes.button} id={elem.id} component="span" onClick={this.handleClick}>
            <DeleteSweep />
          </IconButton>            
        </div>
      ) 
    })
  } 

  delVideo = async (id) => {     
    try {   
      await axios.delete(`https://mad-coder.firebaseio.com/video/${id}.json`) 
      await this.props.listVideoOutput('all')
      this.props.snackBarOpen('success', 'Видео успешно удалено!')
    } catch(e) {
       console.log(e)
    }   
  }

  componentDidMount(){
    this.props.listVideoOutput('all').then(() => {
      this.setState({
        preloader: false
      })
    })
  } 

  render() {
    const {classes} = this.props
    const {preloader} = this.state
    
    return (
      <div className={classes.mainVideo}>
        {
          !preloader
            ? <>
                <h2>Выберите видеоролик для удаления</h2>
                <MyPopover anchorEl={this.state.anchorEl} id={this.state.idVideo} handleClose={this.handleClose} del={this.delVideo}/>       
                {this.renderList()} 
              </>
          : <PreloaderLocale />
        }        
        <Snackbars />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    videoList: state.videoReducer.videoList,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listVideoOutput: (id) => dispatch(listVideoOutput(id)),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(VideoDelete))