import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import { listOutput, deleteNews } from '../../../store/actions/actionNews';
import IconButton from '@material-ui/core/IconButton';
import DeleteSweep from '@material-ui/icons/DeleteSweep';
import MyPopover from '../../../UI/MyPopover/MyPopover';
import { storageRef } from '../../../variable/configFirebae';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import { snackBarOpen } from '../../../store/actions/actionAdmin';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'


const style = () => ({
  mainNews: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    position: 'relative',
    height: '100%',

    '& h2': {
      marginBottom: 20
    }
  },
  mainOneNews: {
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

class NewsDelete extends Component {
  state = {
    anchorEl: null,
    idNews: "",
    photoName: "",
    preloader: true
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      idNews: event.currentTarget.id,
      photoName: event.currentTarget.dataset.photo
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  renderList = () => {
    const {listNews, classes} = this.props
    return listNews.map((elem, index) => {
      return(
        <div key={elem.id} data-id={elem.id} className={classes.mainOneNews} >
          <span>{index + 1})</span>
          <p className={classes.textTitle}>{elem.title}</p>
          <IconButton  className={classes.button} id={elem.id} data-photo={elem.photoName} component="span" onClick={this.handleClick}>
            <DeleteSweep />
          </IconButton>            
        </div>
      ) 
    })
  } 
  
  delNews = async (id, photo) => {     
    let desertRef = storageRef.child(`news/${photo}`)    
    try {   
      await desertRef.delete()//удалили фотку из localstorage   
      await this.props.deleteNews(id)// удалили новость из database     
      this.props.snackBarOpen('success', "Новость успешно удалена!")     
    } catch(e) {
       console.log(e)
       this.props.snackBarOpen('error', "Новость не удалена!")   
    }   
  }

  componentDidMount() {
    this.props.listOutput('all').then(() => {
      this.setState({
        preloader: false
      })
    })
  } 

  render() {
    const { classes } = this.props
    const { preloader } = this.state
    return (
      <div className={classes.mainNews} >
        {
          !preloader
            ? <>
                <h2>Выберите новость для удаления</h2>
                <MyPopover anchorEl={this.state.anchorEl} deleteText="Новость успешно удалена!" photo={this.state.photoName} id={this.state.idNews} handleClose={this.handleClose} del={this.delNews}/>       
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
    listNews: state.newsReducer.listNews,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listOutput: (id) => dispatch(listOutput(id)),
    deleteNews: (id) => dispatch(deleteNews(id)),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(NewsDelete))