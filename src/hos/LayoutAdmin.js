import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import TopMenuAdmin from '../UI/TopMenuAdmin/TopMenuAdmin'


const styles = () => ({
  mainAdmin: {
    maxWidth: 1390,
    margin: "0 auto",
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    borderRadius: 5,
    overflow: 'hidden'
  },
  TopMenuAdmin: {
    gridColumn: 'span 4'
  },
  contentAdmin: {
    gridColumn: 'span 4',
    minHeight: 'calc(100vh - 264px)',
    background: '#fff',
    display: 'flex',
    height: '100%'
  }
})

 class LayoutAdmin extends Component {

  render() {

    const {classes} = this.props

    return (      
      <div  className={classes.mainAdmin}>
        <div className={classes.TopMenuAdmin}><TopMenuAdmin /></div>
    
        <div className={classes.contentAdmin}>
          {this.props.children}
        </div>        
      </div>
    )
  }
}

export default withStyles(styles)(LayoutAdmin)
