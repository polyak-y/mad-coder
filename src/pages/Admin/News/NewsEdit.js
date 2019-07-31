import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from 'react-redux'
import { listOutput } from '../../../store/actions/actionNews';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import {withRouter} from 'react-router-dom'
import Snackbars from '../../../UI/Snackbars/Snackbars';
import Tooltip from '@material-ui/core/Tooltip';
import PreloaderLocale from '../../../UI/PreloaderLocale/PreloaderLocale'


const style = () => ({
  mainNews: {
    flexGrow: 1,
    textAlign: 'center',
    padding: 30,
    position: 'relative',
    height: '100%',

    '& h2': {
      marginBottom: 20
    }
  },
  mainOneNews: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    paddingLeft: 3,
    borderBottom: '1px solid lightgray',
    transition: 'background .3s ease-in-out',

    "&:hover": {
      background:' rgba(72, 183, 29, .1)'
    }
  },
  button: {
    color: 'green',    
  },
  textTitle: {
    flexGrow: 1,
    textAlign: 'left',
    paddingLeft: 10,
    fontWeight: 'bold'
  }
})

class NewsEdit extends Component {
  state = {
    preloader: true
  }

  buttonClickHandler= (id) => {
    this.props.history.push({pathname: `/admin/news/edit/${id}`})
  }

  renderList = () => {
    const {listNews, classes} = this.props
    return listNews.map((elem, index) => {
      return(
        <div key={elem.id} className={classes.mainOneNews} >
          <span>{index + 1})</span>
          <p className={classes.textTitle}>{elem.title}</p>
          <Tooltip title="редактировать" placement="left">
            <IconButton  className={classes.button} id={elem.id} component="span" onClick={() => this.buttonClickHandler(elem.id)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </div>
      )
    })
  }

  componentDidMount() {
    this.props.listOutput('all').then(() => {
      this.setState({
        preloader: false
      })
    })
  } 

  render() {
    const {classes} = this.props
    const { preloader } = this.state
    return (
      <div className={classes.mainNews} > 
        {
          !preloader 
            ? <>
                <h2>Выберите новость для редактирования</h2>       
                {this.renderList()}  
              </>
            : <PreloaderLocale />
        }           
        <Snackbars /> 
     </div>
    )
  }
}

function mapStateToProps(state){
  return {
    listNews: state.newsReducer.listNews,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listOutput: (id) => dispatch(listOutput(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(NewsEdit)))
