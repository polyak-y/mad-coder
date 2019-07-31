import React from 'react';
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import { listVideoOutput } from '../../../store/actions/actionVideo';
import InputOutline from '../../../UI/InputOutline/InputOutline';
import Button from '../../../UI/Button/Button';
import axios from 'axios';
import { date } from '../../../function/date';
import { buttonOff, buttonOn, snackBarOpen } from '../../../store/actions/actionAdmin';
import Snackbars from '../../../UI/Snackbars/Snackbars';

const style = () => ({
  mainVideo: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30
  },  
  buttonBlock: {
    marginTop: 10,
  }
})


class VideoEditOne extends React.Component {

  state = {
    title: "",
    src: ""
  }  

  componentDidMount() {
    this.props.listVideoOutput(this.props.match.params.id).then(() => {
      this.setState({
        title: this.props.videoList[0].name,
        src: this.props.videoList[0].src
      })
    })
  }

  inputHandler = (event) => {
    const {name, value} = event.currentTarget
   
    this.setState({
      [name]: value
    }) 
  }

  editVideoClick = async () => {
    const {id} = this.props.match.params
    const{title, src} = this.state

    if(title !== '' &&src !== '') {

      this.props.buttonOff()

      const editVideo = {
        createdAt: date(),
        name: title,
        src: src
      }

      try {
        await axios.patch(`https://mad-coder.firebaseio.com/video/${id}.json`, editVideo)
        this.props.history.push({pathname: '/admin/video/edit'})
        document.documentElement.scrollTop = 0
        this.props.buttonOn()
        this.props.snackBarOpen('success', 'Видео отредактировано!' )
      } catch (e) {
        console.log(e);      
      }    
    } else {
      this.props.snackBarOpen('error', 'Все поля должны быть заполнены!')
    }
  }

  renderOneNews = () => {
    let videoList = this.props.videoList[0]  
    const {classes} = this.props

    if(videoList) {      
      return (
        <React.Fragment >
          <h3>"{videoList.name}"</h3>
          <form encType="multipart/form-data">
            <InputOutline label={'Название видеоролика'} value={this.state.title} onChange={this.inputHandler} name='title' /> 
            <InputOutline label={'Ссылка на видеоролик'} value={this.state.src} onChange={this.inputHandler} name='src'/> 
            <div className={classes.buttonBlock}>
                <Button 
                  text="редактировать" 
                  class="enter"                  
                  disabled={this.props.disabled} 
                  onClick={this.editVideoClick}
                /> 
                
                <Button
                    text="Отмена"  
                    onClick={() => {
                      this.props.history.push({pathname: '/admin/video/edit'})
                      document.documentElement.scrollTop = 0
                    }} 
                /> 
              </div> 
            </form> 
        </React.Fragment>
      )
    }    
  }
  
  render() {
    const {classes} = this.props
    
    return (
      <div className={classes.mainVideo}>
        <h2>Редактирование видеоролика</h2>
        {this.renderOneNews()}    
        <Snackbars />     
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    videoList: state.videoReducer.videoList,
    disabled: state.adminReducer.disabled,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listVideoOutput: (id) => dispatch(listVideoOutput(id)),
    buttonOff: () => dispatch(buttonOff()),
    buttonOn: () => dispatch(buttonOn()),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(VideoEditOne))
