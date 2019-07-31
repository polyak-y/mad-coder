import React from 'react';
import { withStyles, Typography, Button } from '@material-ui/core';
import VideoBlock from './VideoBlock/VideoBlock';
import {connect} from 'react-redux'
import { listVideoOutput } from '../../store/actions/actionVideo';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Preloader from '../../UI/Preloader/Preloader'

const styles = {
  VideoGalery: {
    minHeight: 300,    
    padding: '0 50px 50px 50px',
    display: 'grid',
    gridGap: '30px',
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  VideoGalery__title: {
    gridColumn: 'span 2',
    textAlign: 'center',
    fontWeight: 'bold'
  },
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
  renderVideoList: {
    gridColumn: 'span 2',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '30px'
  }
}

class VideoGalery extends React.Component {
  state = {
     preloader: true
  }

  componentDidMount(){
    this.props.listVideoOutput().then(() => {
      this.setState({
        preloader: false
      })
    })
  }

  renderVideoList = () => {
    return(
      this.props.videoList.map(elem =>(
        <VideoBlock src={elem.src} key={elem.id} id={elem.id} name={elem.name}/>
      ))
    )    
  }

  nextAndPrevPage = (event) => {
    this.setState({
      preloader: true
    })
    const {id} = event.currentTarget   
    this.props.listVideoOutput(id).then(() => {
      this.setState({
        preloader: false
      })
    })
  }

  render() {
    const { classes } = this.props;
    const { preloader } = this.state

    return (
      <div className={classes.VideoGalery}>
        {
          !preloader 
            ? <>
                <Typography variant="h2" className={classes.VideoGalery__title}>
                  Видеогалерея
                </Typography>

                <React.Fragment>
                  <div className={classes.renderVideoList}>
                    {this.renderVideoList()}
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

function mapStateToProps(state){
  return {
    videoList: state.videoReducer.videoList,
    countPage: state.mediaReducer.countPage,
    disabledNext: state.mediaReducer.disabledNext,
    disabledPrev: state.mediaReducer.disabledPrev,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listVideoOutput: (id) => dispatch(listVideoOutput(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps )(withStyles(styles)(VideoGalery))