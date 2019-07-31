import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import blueGrey from '@material-ui/core/colors/blueGrey';

const styles = () => ({

  margin: {
    margin: '0 0 15px 0',
    width: '100%'
  },
  cssLabel: {
    '&$cssFocused': {
      color: blueGrey[700],
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: blueGrey[700],
    },
  },
  
});

function CustomizedInput (props) {
  const { classes } = props;

  return (
      <FormControl className={classes.margin}>
        <InputLabel
          htmlFor={props.id}
          classes={{
            root: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          {props.textLabel}
        </InputLabel>
        <Input
          id={props.id}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          classes={{
            underline: classes.cssUnderline,
          }}     
        />
      </FormControl>        
  );
}


export default withStyles(styles)(CustomizedInput);