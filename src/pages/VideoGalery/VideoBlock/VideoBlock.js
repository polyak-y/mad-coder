import React from 'react';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = {
  VideoBlock: {  
    padding: 15,
    transition: 'all 1s',
    '&:hover': {      
      boxShadow: 'none'
    }
  }, 
  VideoBlock__head: {
    textAlign: 'center',
    marginBottom: 15
  },
  VideoBlock__videoContent: {
    paddingTop: '56.25%',
    background: 'lightGray',
    position: 'relative',
    '& iframe': {
      position: 'absolute',
      top: 0, 
      left: 0, 
      zIndex: 12
    },
    '& p': {
      position: 'absolute',
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      fontSize: 38,
      color: 'gray',
      whiteSpace: 'nowrap'
    }    
  }
}

const VideoBlock = (props) => {
  const { classes } = props;

    return (
      <React.Fragment>
        <Paper className={classes.VideoBlock} elevation={15} id={props.id}>
          <Typography variant="h5" className={classes.VideoBlock__head}>
            {props.name}
          </Typography>
          <div className={classes.VideoBlock__videoContent}>
            <p>ВИДЕО ЗАГРУЖАЕТСЯ</p>
            <iframe title={"Math.random()"} width="100%" height="100%" src={props.src} frameBorder="0"></iframe>
          </div>
        </Paper>             
      </React.Fragment>      
    )  
}

 export default withStyles(styles) (VideoBlock);
