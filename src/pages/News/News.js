import React from 'react';
import { withStyles, Paper, Typography, Button, Divider } from '@material-ui/core';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {listOutput} from '../../store/actions/actionNews'
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import { homePageNewsFalse } from '../../store/actions/actionMedia';
import Preloader from '../../UI/Preloader/Preloader'
 
const styles = theme => ({
  mainNews: {
    width: 1390,
    minHeight: 200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gridGap: '25px'
  },
  oneNews: {
    padding: 15,  
    display: 'flex',
    flexDirection: 'column', 
    borderRadius: '8px',
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    transition: 'all .3s',
    '&:hover': {
      boxShadow: '0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2)'
    }
  }, 
  floatImg: {
    overflow: 'hidden',
    flexGrow: 1,
    marginTop: 20
  },
  news__title: {
    gridColumn: 'span 2',
    padding: '15px 0'    
  },
  news__img: {
    width: '25%',
    float: 'left',
    marginRight: 10,
    marginBottom: 0,
  },
  news__text: {
    textIndent: 15,
    textAlign: 'justify'
  },
  button: {
    margin: theme.spacing.unit,
  },
  news__button: {
    textAlign: 'right',
    margin: 0
  },
  news__head: {
    marginBottom: '15px',
    lineHeight: '23px',
  },
  buttomIcon: {
    backgroundColor: '#455A64',
    '&:hover': {
      backgroundColor: '#455A64'
    }
  },
  newsContent: {
    gridColumn: 'span 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',    
    gridGap: '25px',
    minHeight: 635,
    alignContent: 'start'
  },
  buttonBlock: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  pageCoint: {
    display: 'flex',
    alignItems: 'center'
  }
})

class News extends React.Component {

  state = {
    preloader: true
  }

  renderSmallNews = () => {
    const { classes } = this.props

    return (
      this.props.listNews.map(elem => {        
        const text = elem.text.substr(0, 345).split('&&&')
        let newtext = text.map((elem, index) =>(
          <Typography component="p" key={index} className={classes.news__text}>
            {index === text.length -1 ? `${elem}...` : elem}
          </Typography>
        ))

        return (          
          <Paper className={classes.oneNews} square={false} key={elem.id}>
            <Typography variant="h6" align="center" className={classes.news__head}>
                {elem.title}
            </Typography> 
            <Divider />   
            <div className={classes.floatImg}>
               <img src={elem.imgSource} id={elem.id} alt="news" className={classes.news__img} /> 
              {newtext}
            </div>
            <p className={classes.news__button}>
              <Link to={`/news/${elem.id}`}> 
                <Button 
                className={classes.button} 
                onClick={()=> {
                  document.documentElement.scrollTop = 0
                  this.props.homePageNewsFalse()
                }}>Читать</Button>
              </Link>
            </p>    
          </Paper>
        )
      })
    )
  }

  nextAndPrevPage = (event) => {
    this.setState({
      preloader: true
    })
    const {id} = event.currentTarget   
    this.props.listOutput(id).then(() => {
      this.setState({
        preloader: false
      })
    })
  } 
 
  componentDidMount() {
    this.props.listOutput().then(() => {
      this.setState(({preloader}) => ({
        preloader: !preloader
      }))
    })
  } 
  
  render() {
    const { classes } = this.props 
    const {preloader} = this.state

    return (    
      <div className={classes.mainNews}>
        {!preloader 
          ?<>
            <Typography variant="h4" align="center" className={classes.news__title}>
              Новости сайта Mad Coder
            </Typography>
            <div className={classes.newsContent}>
              {this.renderSmallNews()}
            </div>
            <div className={classes.buttonBlock}>
              <p className={classes.pageCoint}>Стр. <strong>{this.props.countPage}</strong></p>
              <Button
                style={{ marginRight: '7px', marginLeft: '10px' }}
                variant="contained"
                disabled={this.props.disabledPrev}
                color="primary"
                id="prevButton"
                className={classes.buttomIcon}
                onClick={this.nextAndPrevPage}
              >
                <NavigateBefore />Назад
              </Button>

              <Button variant="contained" disabled={this.props.disabledNext} color="primary" className={classes.buttomIcon} id="nextButton" onClick={this.nextAndPrevPage}>
                Вперед<NavigateNext />
              </Button>
            </div>
          </>
          : <Preloader />     
      }
        
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return {
    listNews: state.newsReducer.listNews,
    disabledPrev: state.mediaReducer.disabledPrev,
    disabledNext: state.mediaReducer.disabledNext,
    countPage: state.mediaReducer.countPage,
    backinussr: state.mediaReducer.backinussr
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listOutput: (id) => dispatch(listOutput(id)),
    homePageNewsFalse: () => dispatch(homePageNewsFalse())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(News))






