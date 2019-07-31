import React from 'react';
import { withStyles } from '@material-ui/core';
import Textarea from '../../../UI/Textarea/Textarea';
import {connect} from 'react-redux'
import InputFile from '../../../UI/InputFile/InputFile'
import Button from '../../../UI/Button/Button'
import InputOutline from '../../../UI/InputOutline/InputOutline'
import { addValueTextField, addNewsDatabase, photoName, snackBarOpen, buttonOff } from '../../../store/actions/actionAdmin';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import { imgRead } from '../../../function/imgRead';
import { storage, storageRef } from '../../../variable/configFirebae';

const style = () => ({
  mainNews: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30
  }
})

const News = (props) => {
  const {classes} = props

  const inputTextareaValue = (event) => { // обработчик на ввод текста в инпуты
    const {value, id} = event.currentTarget
    props.addValueTextField(value,id) 
  }

  const onChangeHandler = (event) => { //обработчик на выбор картинки
    let target = event.currentTarget
    imgRead(event)   
    if(target.files[0]) {
      props.photoName(target.files[0].name, target.files[0]) // добавляем имя файла в state  
    }    
  }

  const addImgFirebase = async (file) => {//добалвяем картинку в localstorage 
    let storageRef = storage.ref(`news/${file.name}`)
    await storageRef.put(file)
    return Promise.resolve(file.name)
  } 
  
  const addImgStore = async (fileName) => {  //получаем ссылку на картинку из localstorage
    let starsRef = storageRef.child(`news/${fileName}`) 
    try {
      let url = await starsRef.getDownloadURL() 
      return Promise.resolve(url)
    } catch(e) {
       console.log(e) 
    } 
  }

  const popsa = (url) => {
    props.addNewsDatabase(props.inputAdminTitile, props.textareaAdminText, url, props.fileName) // добавляем данные на database     
    props.snackBarOpen('success', "Новость успешно добавлена!") //вызываем снэкбар с сооб
  }

  const addNews = () => {   
    const {inputAdminTitile, textareaAdminText, fileName, file} = props
   
    if(inputAdminTitile && textareaAdminText && fileName) {
      props.buttonOff()
      addImgFirebase(file)
      .then(addImgStore)
      .then(popsa)
    } else {
      props.snackBarOpen('error', "Заполнены не все поля!")
    }    
  }

  return ( 
    <React.Fragment>   
      <div className={classes.mainNews} >
        <h2>Добавление новости</h2>
        <form encType="multipart/form-data">
          <InputOutline label="Заголовок" id="inputAdminTitile" onChange={inputTextareaValue} value={props.inputAdminTitile}/>
          <Textarea multiline={true} label="Текст новости" id="textareaAdminText" onChange={inputTextareaValue} value={props.textareaAdminText} />
          <InputFile onChange={onChangeHandler} title="выбрать изображение пропроции: 1000х600"/>  
          <Button text="Добавить новость" class="newsAdmin" disabled={props.disabled}  onClick={addNews}/>
        </form>
      </div>
      <Snackbars />
    </React.Fragment>
  )
}

function mapStateToProps(state) {
  return {
    inputAdminTitile: state.adminReducer.inputAdminTitile,
    textareaAdminText: state.adminReducer.textareaAdminText,
    fileName: state.adminReducer.fileName,
    file: state.adminReducer.file,
    downLoadImg: state.adminReducer.downLoadImg,
    disabled: state.adminReducer.disabled
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addValueTextField: (value, id) => dispatch(addValueTextField(value, id)),
    photoName: (fileName, file) => dispatch(photoName(fileName, file)),
    addNewsDatabase: (title, text, url, fileName) => dispatch(addNewsDatabase(title, text, url, fileName)),
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
    buttonOff: () => dispatch(buttonOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(News))