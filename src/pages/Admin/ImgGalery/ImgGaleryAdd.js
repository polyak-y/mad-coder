import React from 'react';
import { withStyles } from '@material-ui/core';
import InputFile from '../../../UI/InputFile/InputFile';
import { imgRead } from '../../../function/imgRead';
import {connect} from 'react-redux'
import { photoName, snackBarOpen, addImgGalery, buttonOff } from '../../../store/actions/actionAdmin';
import SelectSize from '../../../UI/Select/SelectSize';
import Button from '../../../UI/Button/Button';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import { storage, storageRef } from '../../../variable/configFirebae'

const style = () => ({ 
  mainImg: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,

    '& h2': {
      marginBottom: 20
    }
  },
  mainSelect: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    marginBottom: 15
  }
})

const ImgGalery = (props) => {

  const {classes} = props
  
  const onChangeHandler = (event) => {
    imgRead(event) // функция для отрисовки изображения в браузерsе
    props.photoName(event.currentTarget.files[0].name, event.currentTarget.files[0]) // добавляем имя выбранного файла в state
  }

  const addImgFirebase = async (file) => {//добалвяем картинку в localstorage 
    let storageRef = storage.ref(`galery/${file.name}`)
    await storageRef.put(file)
    return Promise.resolve(file.name)
  } 

  const addImgStore = async (fileName) => { //получаем ссылку на картинку из localstorage
    let starsRef = storageRef.child(`galery/${fileName}`) 
    try {
      let url = await starsRef.getDownloadURL() 
      return Promise.resolve(url)
    } catch(e) {
       console.log(e) 
    } 
  }

  const itog = (url) => {        
    props.addImgGalery(props.width, props.height, url, props.fileName) //добавили данные с полей в database
    props.snackBarOpen('success', "Картинка успешно добавлена в галерею!") // вызываем снэкбар 
  }

  const buttonClickHandler = () => {
    const {width, height, fileName, file} = props
 
    if(width && height && fileName) {
      props.buttonOff()
      addImgFirebase(file)
      .then(addImgStore)
      .then(itog)    
    } else {
      props.snackBarOpen('error', "Заполнены не все поля!")
    }
  }

  return (
    <React.Fragment>
      <div className={classes.mainImg}>
        <h2>Добавление изображения для галереи</h2>
        <form encType="multipart/form-data">
          <InputFile onChange={onChangeHandler}/>
          <div className={classes.mainSelect}>
            <SelectSize label="Ширина" name="width" property={props.width} />
            <SelectSize label="Высота" name="height" property={props.height} />
          </div>  
          <Button text="добавить изображение" class="newsAdmin" disabled={props.disabled} onClick={buttonClickHandler}/>
        </form>
      </div>
      <Snackbars />
    </ React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    width: state.adminReducer.width,
    height: state.adminReducer.height,
    fileName: state.adminReducer.fileName,
    file: state.adminReducer.file,
    disabled: state.adminReducer.disabled
  }
}

function mapDispatchToProps(dispatch) {
  return {
    photoName: (fileName, file) => dispatch(photoName(fileName, file)),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
    addImgGalery: (width, height, url, fileName)  => dispatch(addImgGalery(width, height, url, fileName)),
    buttonOff: () => dispatch(buttonOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ImgGalery))