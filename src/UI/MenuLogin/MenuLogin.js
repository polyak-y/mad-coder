import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import toRenderProps from 'recompose/toRenderProps';
import withState from 'recompose/withState';
import {connect} from 'react-redux'
import {output} from '../../store/actions/actionMenu'
import {withRouter} from 'react-router-dom'

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));

function MenuLogin(props) {

  return (
    <WithState>
      {({ anchorEl, updateAnchorEl }) => {
        const open = Boolean(anchorEl);
        const handleClose = () => {
          updateAnchorEl(null);
        };

        return (
          <React.Fragment>
            <span
              aria-owns={open ? 'render-props-menu' : undefined}
              aria-haspopup="true"
              onClick={event => {
                updateAnchorEl(event.currentTarget);
              }}
            >
             {props.name}
            </span>
            <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose} >
              <MenuItem onClick={handleClose}>
                <span onClick={() => { 
                  props.output()
                  props.history.push({pathname: '/'})
                }}>
                Выход
                </span>
              </MenuItem>            
            </Menu>
          </React.Fragment>
        )
      }}
    </WithState>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    output: () => dispatch(output())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(MenuLogin));