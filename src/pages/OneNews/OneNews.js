import React, { Component } from 'react'
import { withStyles, Paper, Typography } from '@material-ui/core';
import {connect} from 'react-redux'
import { listOutputOneNews } from '../../store/actions/actionNews';
import Button from '../../UI/Button/Button';
import { backInUssr } from '../../store/actions/actionMedia';
import Preloader from '../../UI/Preloader/Preloader'

const styles = () => ({
  OneNews: {
    maxWidth: 1390,
    margin: '0 auto',    
  }, 
  oneNews__paper: {
    padding: '30px 30px 80px 30px'
  }, 
  oneNews__head: {
    fontSize: 25, 
    marginBottom: 15
  },
  oneNews__img: {
    textAlign: 'center',
    marginBottom: 25,
    '& img': {
      width: '60%',
      maxWidth: '100%'
    }
  }, 
  oneNews__text: {
    fontSize: 20, 
    width: '80%',
    margin: '0 auto',
    textIndent: 25
  },
  wrapButton: {
    width: '80%',
    margin: '20px auto 0',
  }
})

class OneNews extends Component {

  state = {
    preloader: true
  }

  backAllNews = () => {
    this.props.backInUssr()
    this.props.history.push({pathname: '/news'})
  }

  backHomePage = () => {
    this.props.history.push({pathname: '/'})
  }

  renderOneNews = () => {
    const { classes } = this.props;
    let renderOneNews = this.props.oneNews[0]
  
    if(renderOneNews) { 
      let text = renderOneNews.text.split('&&&').map((elem, index)=>(
        <Typography component='p' className={classes.oneNews__text} key={index}>
          {elem}
        </Typography>
      ))

      return (
        <Paper className={classes.oneNews__paper} square={false}>
          <Typography variant="h6" align="center" className={classes.oneNews__head}>
            {renderOneNews.title}
          </Typography>
          <div className={classes.oneNews__img} >
           <img src={renderOneNews.imgSource} id={renderOneNews.id} alt="news" />
          </div>   
          {text} 
          <p className={classes.wrapButton}>
            {
              !this.props.homePageTwoNews 
                ? <Button text="<<< Вернуться к списку новостей" onClick={this.backAllNews} /> 
                : <Button text="назад" onClick={this.backHomePage} />
            }            
          </p>          
        </Paper> 
      )    
    }    
  }

  componentDidMount(){
    this.props.listOutputOneNews(this.props.match.params.id).then(() => {
      this.setState({
        preloader: false
      })
    })
  }
  
  render() {
    const { classes } = this.props;
    const { preloader } = this.state

    return (      
      <div className={classes.OneNews}> 
        {
          !preloader 
            ? this.renderOneNews()
            : <Preloader />
        }     
      </div>      
    )
  }
}

function mapStateToProps(state) {
  return {
    oneNews: state.newsReducer.oneNews,
    homePageTwoNews: state.mediaReducer.homePageTwoNews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listOutputOneNews: (id) => dispatch(listOutputOneNews(id)),
    backInUssr: () => dispatch(backInUssr())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OneNews))
