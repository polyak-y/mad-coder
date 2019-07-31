import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Edit from '@material-ui/icons/Edit';
import LibraryAdd from '@material-ui/icons/LibraryAdd';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { snackBarClose } from '../../store/actions/actionAdmin';


const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper, 
    borderRight: '1px solid rgba(0, 0, 0, 0.3)'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class SideBar extends React.Component {

  render() {
    const { classes, location: {pathname} } = this.props;
    let name
   
    if(pathname.indexOf('news') !== -1) {
      name = "новость"
    } else if(pathname.indexOf('img') !== -1) {
      name = "изображение"
    } else {
      name = "видео"
    }

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Выберите действие</ListSubheader>}
        className={classes.root}
      >
        <ListItem 
          button 
          divider={true} 
          selected={pathname.indexOf('add') !== -1 ? true : false} 
          onClick={() => {
            this.props.history.push({pathname: `/admin/${this.props.add}`})
            this.props.snackBarClose()
          }}
        >
          <ListItemIcon>
            <LibraryAdd />
          </ListItemIcon>
          <ListItemText inset primary={`Добавить ${name}`} />
        </ListItem>

        <ListItem 
          style={pathname.indexOf('img') !== -1 ? {display: 'none'} : null }
          button 
          divider={true} 
          selected={pathname.indexOf('edit') !== -1 ? true : false} 
          onClick={() => {
            this.props.history.push({pathname: `/admin/${this.props.edit}`})
            this.props.snackBarClose() 
          }}
        >
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText inset primary={`Редактировать ${name}`} />
        </ListItem>
       
        <ListItem 
          button 
          divider={true} 
          selected={pathname.indexOf('delete') !== -1 ? true : false} 
          onClick={() => {
            this.props.history.push({pathname: `/admin/${this.props.delete}`})
            this.props.snackBarClose()
          }}
        >
          <ListItemIcon>
            <DeleteForever /> 
          </ListItemIcon>
          <ListItemText inset primary={`Удалить ${name}`} />
        </ListItem>
      </List>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    snackBarClose: () => dispatch(snackBarClose())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles)(SideBar)));