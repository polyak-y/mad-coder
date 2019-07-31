import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15,
  },
  margin: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  cssLabel: {
    marginTop: -3,
    '&$cssFocused': {
      color: '#455A64',
      marginTop: 0,
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

function InputOutline (props) {
  const { classes } = props;

  return (
    <div className={classes.container}>
      <TextField
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
        onChange={props.onChange}
        value={props.value}
        name={props.name}
      />      
    </div>
  );
}

export default withStyles(styles)(InputOutline);
