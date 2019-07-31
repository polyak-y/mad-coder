import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Button from '../Button/Button'

const styles = () => ({
  popoverPaper: {
    padding: 10
  },
  titlePopover: {
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase'
  },
  buttonBlock: {
    textAlign: 'center'
  }
});

class MyPopover extends React.Component {

  buttonClickHandler = () => {
    this.props.del(this.props.id, this.props.photo)
    this.props.handleClose()
  }

  render() {
    const { classes } = this.props;
    const open = Boolean(this.props.anchorEl);

    return ( 
      <div>   
        <Popover
          classes={{
            paper: classes.popoverPaper
          }}
          id="simple-popper"
          open={open}
          anchorEl={this.props.anchorEl}
          onClose={this.props.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <p className={classes.titlePopover}>Действительно удалить?</p>
          <div className={classes.buttonBlock}>
            <Button text="Да" class="enter" onClick={this.buttonClickHandler} />
            <Button text="Нет" onClick={this.props.handleClose} />
          </div>
        </Popover>
      </div>
    );
  }
}


export default withStyles(styles)(MyPopover);