import React from 'react';
import './Footer.css'
import Typography from '@material-ui/core/Typography';

const Footer = () => {

  let date = new Date()
  let year = date.getFullYear()

  return (
    <footer className='Footer'>
      <Typography variant="h6" gutterBottom color="inherit">
        2007-{year} © Федеральный интернет-портал Mad Coder
      </Typography>
    </footer>
  )
}

export default Footer