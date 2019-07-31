import React from 'react'
import { withStyles, Paper } from '@material-ui/core';
import PlaginGalery from '../../../pages/ImgGallery/PlaginGalery/PlaginGalery';

const styles = theme => ({
  lastImg_block: {
    gridColumn: 'span 6',
    padding: 15    
  }
});

const LastImg = (props) => {
  
  const { classes } = props; 
  return ( 
    <Paper className={classes.lastImg_block} square={false} >
      <PlaginGalery imgList={props.lastImg}/>
    </Paper>       
  )  
}

export default withStyles(styles)(LastImg)