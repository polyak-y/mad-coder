import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%',
    marginTop: 15,

    '& textarea': {
      minHeight: 200
    }   
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#455A64',
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#455A64',
    },
  },
  notchedOutline: {},
  
});

function Textarea (props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <TextField        
        multiline={props.multiline}
        className={classes.margin}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        label={props.label}
        variant="outlined"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />   
    </div>
  );
}

export default withStyles(styles)(Textarea);