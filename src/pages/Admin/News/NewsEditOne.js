import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux"
import { listOutputOneNews, editNewsValue } from '../../../store/actions/actionNews';
import InputOutline from '../../../UI/InputOutline/InputOutline';
import Textarea from '../../../UI/Textarea/Textarea';
import InputFile from '../../../UI/InputFile/InputFile';
import Button from '../../../UI/Button/Button';
import { imgRead } from '../../../function/imgRead';
import { storage, storageRef } from '../../../variable/configFirebae';
import Snackbars from '../../../UI/Snackbars/Snackbars';
import { snackBarOpen, buttonOff, editNewsDatabase } from '../../../store/actions/actionAdmin';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'

const style = () => ({
  mainNews: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    position: 'relative',
    height: '100%'
  }
})

 class NewsEditOne extends Component {
  state = {
    fileName: '',
    file: null,
    error: false,
    preloader: true
  }
   
  inputTextareaValue = (event) => { // событие на набор текста в текстовых полях
    const {id, value} = event.currentTarget
    this.props.editNewsValue(id, value)    
  }

  onChangeHandler = (event) => { // событие на input file
    let target = event.currentTarget
    imgRead(event) // отрисовываем картинку в браузере      

    if(target.files[0]) {      
      this.setState({
        fileName: target.files[0].name,
        file: target.files[0]
      }) 
    }  
  }

  addImgFirebase = async (file) => {//добалвяем картинку в localstorage 
    let storageRef = storage.ref(`news/${file.name}`)
    await storageRef.put(file)
    return Promise.resolve(file.name)
  } 

  addImgStore = async (fileName) => {  //получаем ссылку на картинку из localstorage
    let starsRef = storageRef.child(`news/${fileName}`) 
    try {
      let url = await starsRef.getDownloadURL() 
      return Promise.resolve(url)
    } catch(e) {
       console.log(e) 
    } 
  }    
  
  deleteFilelocalstorage = async (url) => { // уадаление старой картинки
    let desertRef = storageRef.child(`news/${this.props.photoName}`)
    await desertRef.delete()
    try {      
      return Promise.resolve(url)
    } catch(e) {
       console.log(e)
    } 
  }

  popsa = (url) => { // обновляем новость database по его id
    this.props.editNewsDatabase(this.props.match.params.id, this.props.inputAdminTitile, this.props.textareaAdminText, url, this.state.fileName) // добавляем данные на database   
    this.props.history.push.call(this, {pathname: '/admin/news/edit'})   
    this.props.snackBarOpen('success', "Новость отредактирована!") //вызываем снэкбар с сообщением           
  }

  editNewsClick = () => {
    const {inputAdminTitile, textareaAdminText} = this.props
    const {fileName, file} = this.state

    if(fileName && inputAdminTitile !== '' && textareaAdminText !== '') { // если меняли картинку то...
      this.props.buttonOff() // делаем кнопку disabled
      this.addImgFirebase(file) //добалвяем картинку в localstorage 
      .then(this.addImgStore) //получаем ссылку на картинку из localstorage
      .then(this.deleteFilelocalstorage) //удаление старой картинки
      .then(this.popsa)
      
    } else if(!fileName && inputAdminTitile !== '' && textareaAdminText !== ''){ //если не меняли картинку то...      
      this.props.buttonOff() 
      this.props.editNewsDatabase(this.props.match.params.id, inputAdminTitile, textareaAdminText)
      this.props.snackBarOpen('success', "Новость отредактирована!")       
      this.props.history.push({pathname: '/admin/news/edit'})     
    } else {
      this.setState({ // если поля пустые мы делаем error: true, а он уже позоволяет появиться снекбару
        error: true
      })
      this.props.snackBarOpen('error', "Поля не должны быть пустыми!") 
    }  
  }
  
  renderOneNews = () => {
    let oneNews = this.props.oneNews[0]

    if(oneNews) { 
      return (
        <React.Fragment>
          <h2>Редактирование новости <br />"<span style={{color: '#0F4B00'}}>{oneNews.title}</span>"</h2>
          <form encType="multipart/form-data">
            <InputOutline label="Заголовок" id="inputAdminTitile" onChange={this.inputTextareaValue} value={this.props.inputAdminTitile} />
            <Textarea multiline={true} label="Текст новости" id="textareaAdminText" onChange={this.inputTextareaValue} value={this.props.textareaAdminText} />
            <InputFile onChange={this.onChangeHandler} src={oneNews.imgSource} title="поменять изображение пропорции: 1000х600"/>  
            <div>
              <Button 
                text="редактировать" 
                class="enter"  
                disabled={this.props.disabled} 
                onClick={this.editNewsClick}
              /> 
              
              <Button 
                  text="Отмена"  
                  onClick={() => {
                    this.props.history.push({pathname: '/admin/news/edit'})
                    document.documentElement.scrollTop = 0
                  }} 
              /> 
            </div>      
          </form>
          { this.state.error ?  <Snackbars /> : null  }          
        </React.Fragment>
      )
    }    
  }

  componentDidMount() {
    this.props.listOutputOneNews(this.props.match.params.id).then(()=> {
      this.setState({
        preloader: false
      })
    })    
  }

  render() { 
    const {classes} = this.props  
    const { preloader } = this.state
 
    return (
      <div className={classes.mainNews}> 
              
        { !preloader 
            ? this.renderOneNews()
            : <PreloaderLocale />
          }   
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    oneNews: state.newsReducer.oneNews,
    inputAdminTitile: state.newsReducer.inputAdminTitile,
    textareaAdminText: state.newsReducer.textareaAdminText, 
    photoName: state.newsReducer.photoName,   
    disabled: state.adminReducer.disabled,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listOutputOneNews: (id) => dispatch(listOutputOneNews(id)),
    editNewsValue: (id, value) => dispatch(editNewsValue(id, value)), // для изменения value title и текстового поля с новостью
    snackBarOpen: (variant, message) => dispatch(snackBarOpen(variant, message)),
    editNewsDatabase: (id, title, text, url, fileName) => dispatch(editNewsDatabase(id, title, text, url, fileName)),
    buttonOff: () => dispatch(buttonOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(NewsEditOne))