import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import InputOutline from '../../../UI/InputOutline/InputOutline'
import Button from '../../../UI/Button/Button'
import Snackbars from '../../../UI/Snackbars/Snackbars';
import {connect} from 'react-redux'
import { snackBarOpen, buttonOff, addVideo } from '../../../store/actions/actionAdmin';

const style = () => ({
  mainVideo: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30
  }
})

class Video extends Component {
  state = {
    nameVideo: '',
    srcVideo: ''
  }

  changeHandler = (event) => {   
    let {name, value} = event.currentTarget

    this.setState({
      [name]: value
    })
  }

  clickButtonHandler = () => {
    const {nameVideo, srcVideo} = this.state
    if(nameVideo && srcVideo) {
      this.props.buttonOff()
      this.props.addVideo(nameVideo, srcVideo)
      this.setState({
        nameVideo: '',
        srcVideo: ''
      })

      this.props.snackBarOpen('success', "Видео успешно добавлено")
    } else {
      this.props.snackBarOpen('error', "Заполнены не все поля!")
    }
  }

  render() {
    const {classes} = this.props
    return (
      <React.Fragment> 
        <div className={classes.mainVideo}>
          <h2>Добавление видеороликов</h2>
          <InputOutline label="Название видео" name="nameVideo" onChange={this.changeHandler} value={this.state.nameVideo} />
          <InputOutline label="Ссылка на видео" name="srcVideo" onChange={this.changeHandler} value={this.state.srcVideo} />
          <Button text="Добавить видео" class="newsAdmin" onClick={this.clickButtonHandler} disabled={this.props.disabled} />
        </div>
        <Snackbars />
    </ React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    disabled: state.adminReducer.disabled
  }
}

function mapDispatchToProps(dispatch) {
  return {
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
    buttonOff: () => dispatch(buttonOff()),
    addVideo: (nameVideo, srcVideo) => dispatch(addVideo(nameVideo, srcVideo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Video))