import React from 'react';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import { listImgOutput, deleteImg } from '../../../store/actions/actionImg'
import IconButton from '@material-ui/core/IconButton';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import MyPopover from '../../../UI/MyPopover/MyPopover';
import { storageRef } from '../../../variable/configFirebae';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import { snackBarOpen } from '../../../store/actions/actionAdmin';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'

const style = () => ({ 
  mainImg: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    height: '100%',
    position: 'relative',

    '& h2': {
      marginBottom: 20
    }
  },
  oneImgBlock: {
    height: 150,
    flexGrow:1,
    display: 'flex',
    boxSizing: 'border-box',
    padding: 5,
    border: '1px solid #455A64',
    position: 'relative'
  },
  imgGalery: {
    maxWidth: '100%',
    height: '100%',
    flexGrow: 1,
  },
  imgWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  lastBlock: {
    height: 150,
    flexGrow:20,
  },
  wrapButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    background: 'rgba(255,255,255, .7)',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  button: {
    color: 'tomato',    
  },
})

class ImgGaleryDelete extends React.Component {
  state = {
    anchorEl: null, 
    idImg:"",
    photoName: "",
    preloader: true
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget, 
      idImg: event.currentTarget.id,
      photoName: event.currentTarget.dataset.photo,     
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,      
    })
  };

  componentDidMount() {
    this.props.listImgOutput('all').then(() => {
      this.setState({
        preloader: false
      })
    })
  }

  renderImg = () => {
     const {imgList, classes} = this.props
     
     return imgList.map(elem => (
        <div key={elem.id} className={classes.oneImgBlock}>
          <img src={elem.src} className={classes.imgGalery} alt="" /> 
          <div className={classes.wrapButton}>
            <IconButton  className={classes.button} id={elem.id} data-photo={elem.photoName} component="span" onClick={this.handleClick}>
              <DeleteSweep />
            </IconButton> 
          </div>         
        </div>       
     ))
  } 

  delImg = async (id, photo) => {     
    let desertRef = storageRef.child(`galery/${photo}`)    
    try {   
      await desertRef.delete()//удалили фотку из localstorage   
      await this.props.deleteImg(id)// удалили новость из database  
      this.props.snackBarOpen('success', 'Избражение удалено из галереи!')        
    } catch(e) {
       console.log(e)
    }   
  }

  render() {
    const {classes} = this.props
    const {preloader} = this.state
    
    return (
      <div className={classes.mainImg}>
        {
          !preloader
            ? <>
                <h2>Выберите изображение для удаления</h2>
                <div className={classes.imgWrap}>
                  {this.renderImg()}
                  <div className={classes.lastBlock}></div>
                </div>
                <MyPopover anchorEl={this.state.anchorEl} photo={this.state.photoName} id={this.state.idImg} handleClose={this.handleClose} del={this.delImg} />
              </>
            : <PreloaderLocale />
        }
       
        <Snackbars />    
      </div>  
    )
  }  
}

function mapStateToProps(state) {
  return {
    imgList: state.imgGaleryReducer.imgList,  
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listImgOutput: (id) => dispatch(listImgOutput(id)),
    deleteImg: (id) => dispatch(deleteImg(id)),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ImgGaleryDelete))
