import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import { listVideoOutput } from '../../../store/actions/actionVideo';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'

const style = () => ({
  mainVideo: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    height: '100%',
    position: 'relative',
  },
  mainOneVideo: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    paddingLeft: 3,
    borderBottom: '1px solid lightgray',
    transition: 'background .3s ease-in-out',

    "&:hover": {
      background:' rgba(72, 183, 29, .1)'
    }
  },
  textTitle: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  button: {
    color: 'green',    
  },
})

class VideoEdit extends Component {
  state = {
    preloader: true
  }

  buttonClickHandler= (id) => {
    this.props.history.push({pathname: `/admin/video/edit/${id}`})
  }

  renderList = () => {
    const {videoList, classes} = this.props
    return videoList.map((elem, index) => {
      return(
        <div key={elem.id} className={classes.mainOneVideo} >
          <span>{index + 1})</span>
          <p className={classes.textTitle}>{elem.name}</p>
          <Tooltip title="редактировать" placement="left">
            <IconButton  className={classes.button} id={elem.id} component="span" onClick={this.buttonClickHandler.bind(this, elem.id)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      )
    })
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
                <h2>Выберите видеоролик для редактирования</h2>
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
    listVideoOutput: (id) => dispatch(listVideoOutput(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(VideoEdit))
