import React from 'react'
import { withStyles } from '@material-ui/core';
import VideoBlock from '../../../pages/VideoGalery/VideoBlock/VideoBlock';



const styles = theme => ({
  newVideo: {
    gridColumn: 'span 6',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '30px' 
  }
});

const LastVideo = (props) => {
  const { classes } = props;

  const newVideo = props.twoVideo.map(elem =>(
    <VideoBlock src={elem.src} key={elem.id} id={elem.id} name={elem.name}/>
  ))

  return (
    <div className={classes.newVideo}>
      {newVideo}      
    </div>
  )
}

export default withStyles(styles)(LastVideo)

