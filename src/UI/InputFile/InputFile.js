import React from 'react';
import { withStyles } from '@material-ui/core';
import SvgImg from '../../img/admin/SvgImg/SvgImg'
import Tooltip from '@material-ui/core/Tooltip';
import {noImg} from '../../variable/noImg'


const style = () => ({
  InputFile: {
    display: 'none'
  }, 
  mainUploadImg: {
    position: 'relative',
    minHeight: 100,
    padding: 10,
  },
  uploadImg: {   
    maxWidth: 50,
    cursor: 'pointer',
    fill: '#B0BEC5',
    transition: 'all .3s ease-in',    

    "&:hover": {
      fill: '#455A64'
    }
  },
  imgRead: {
    width: '100%',
    border: '2px solid #fff',
    boxShadow: '0px 0px 0px 2px #455A64',
  },
  mainSvg: {
    width: 70,
    position: 'absolute',
    left: 0,
    top: 0, 
    background: '#fff'
  },
  customWidth: {
    maxWidth: 130,
    textAlign: 'center'
  }
})

const InputFile = (props) => {

  const {classes} = props
  let title = props.title || "выбрать изображение"

  return (
    <React.Fragment>
      <div className={classes.mainUploadImg}>       
          <label> 

            <Tooltip title={title} classes={{ tooltip: classes.customWidth }} placement="top">
              <p className={classes.mainSvg}>
                <SvgImg className={classes.uploadImg} />
              </p>  
            </Tooltip>

            <input type="file" className={classes.InputFile} onChange={props.onChange}/>
          </label>      
        <img className={classes.imgRead} src={props.src || noImg} alt="" id="imgRead" />
      </div>
    </React.Fragment>
  )
}

export default withStyles(style)(InputFile)