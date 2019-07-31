import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  cssRoot: {
    color: '#fff',
    backgroundColor: grey[500],
    '&:hover': {
      backgroundColor: grey[700],
    },
  },
  enter: {  
    backgroundColor: green[600],
    '&:hover': {
      backgroundColor: green[800],
    },
  },
  newsAdmin: {
    backgroundColor: blueGrey[700],
    '&:hover': {
      backgroundColor: blueGrey[500],
    },
  }

});

function Buttons (props) {
  const { classes } = props;
  const cls = [classes.margin, classes.cssRoot]
  cls.push(classes[props.class])

  return (  
      <Button
        variant="contained"
        color="primary"
        className={classNames(cls.join(' '))}
        onClick={props.onClick}
        disabled={props.disabled}      
      >
        {props.text}
      </Button>
  );
}

export default withStyles(styles)(Buttons);