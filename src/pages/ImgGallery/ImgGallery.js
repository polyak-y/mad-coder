import React, { Component } from 'react'
import { Typography, Button, withStyles } from '@material-ui/core';
import { listImgOutput } from '../../store/actions/actionImg';
import PlaginGalery from './PlaginGalery/PlaginGalery';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import {connect} from 'react-redux'
import Preloader from '../../UI/Preloader/Preloader'

const styles = () => ({
  buttonBlock: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px'
  },
  pageCoint: {
    display: 'flex',
    alignItems: 'center'
  },
  buttomIcon: {
    backgroundColor: '#455A64',
    '&:hover': {
      backgroundColor: '#455A64'
    }
  },
  galeryBlock: {
    marginTop: 'auto'
  },
  mainGalery: {
    display: 'flex',
    flexDirection: 'column'
  }
})


class ImgGallery extends Component {
  state = {
    preloader: true
  }

  nextAndPrevPage = (event) => {
    this.setState({
      preloader: true
    })
    const {id} = event.currentTarget
    this.props.listImgOutput(id).then(() => {
      this.setState({
        preloader: false
      })
    })
  } 

  componentDidMount() {
    this.props.listImgOutput().then(()=> {
      this.setState({
        preloader: false
      })
    })
  }

  transformation = () => {
   this.props.imgList.forEach(elem => (
     delete elem.photoName      
    ))
    return this.props.imgList
  }

  render() {
    const { classes } = this.props   
    const {preloader} = this.state

    return (
      <div style={{marginTop: '-30px'}} className={classes.mainGalery}>
        {
          !preloader 
            ? <>
                <Typography variant="h3" style={{ fontWeight: 'bold', padding: '15px 0', textAlign: 'center' }}>
                  Галерея Изображений
                </Typography>

                <React.Fragment>
                  <div className={classes.galeryBlock}>
                    <PlaginGalery imgList={this.transformation()} />
                  </div>

                  <div className={classes.buttonBlock}>
                    <p className={classes.pageCoint}>Стр. <strong>{this.props.countPage}</strong></p>
                    <Button
                      style={{ marginRight: '7px', marginLeft: '10px' }}
                      variant="contained"
                      disabled={this.props.disabledPrev}
                      color="primary"
                      id="prevButton"
                      className={classes.buttomIcon}
                      onClick={this.nextAndPrevPage}
                    >
                      <NavigateBefore />Назад
                  </Button>

                    <Button
                      variant="contained"
                      disabled={this.props.disabledNext}
                      color="primary"
                      className={classes.buttomIcon}
                      id="nextButton"
                      onClick={this.nextAndPrevPage}
                    >
                      Вперед
                    <NavigateNext />
                    </Button>
                  </div>
                </React.Fragment>
              </>
            : <Preloader />
        }               
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    imgList: state.imgGaleryReducer.imgList,
    disabledNext: state.mediaReducer.disabledNext,
    disabledPrev: state.mediaReducer.disabledPrev,
    countPage: state.mediaReducer.countPage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listImgOutput: (id) => dispatch(listImgOutput(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ImgGallery))  

