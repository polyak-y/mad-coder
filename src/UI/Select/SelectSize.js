import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import { addWidthHeight } from '../../store/actions/actionAdmin';

const styles = theme => ({

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,   
  },
  notchedOutline: {
    borderColor: "#455A64!important"
  },
  focused: {
    color: '#455A64!important'
  }

});

class SelectSize extends React.Component {
  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = event => {
    const {name, value} = event.target
    this.props.addWidthHeight(name, value)    
  };

  render() {
    const { classes } = this.props;   

    return (
        <FormControl variant="outlined" 
           className={classes.formControl}          
        >
        
          <InputLabel
            ref={ref => {this.InputLabelRef = ref}}
            htmlFor="outlined-age-simple"
            classes={{
              focused: classes.focused
            }}
          >
            {this.props.label}
          </InputLabel>

          <Select
            value={this.props.property}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name={this.props.name} 
                id="outlined-age-simple"
                classes={{
                  notchedOutline: classes.notchedOutline,
                }}
              />              
            }         
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addWidthHeight: (name, value) => dispatch(addWidthHeight(name, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectSize));