import React from 'react'
import { withStyles, Typography, Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { homePageTwoNews } from '../../../store/actions/actionMedia';

const styles = theme => ({
    oneNews: {
      gridColumn: 'span 3',
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
    news__button: {
      textAlign: 'right',
      margin: 0
    },
    news__head: {
      marginBottom: '15px',
      lineHeight: '23px',
      display: 'flex',
      minHeight: 45,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
      margin: theme.spacing.unit,
    },
});

class LastNews extends React.Component {

  renderTwoNews = () => {
    const { classes } = this.props

    return (
      this.props.twoNews.map(elem => {        
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
              <img src={elem.imgSource} alt="news" className={classes.news__img} />
              {newtext}
            </div>
            <p className={classes.news__button}>
              <Link to={`/news/${elem.id}`}> 
                <Button 
                  className={classes.button} 
                  onClick={() => {
                    document.documentElement.scrollTop = 0
                    this.props.homePageTwoNews()
                  }}
                >Читать</Button>
              </Link>
            </p>    
          </Paper>
        )
      })
    )
  }
 
  render() {    
    return (
      <React.Fragment>
        {this.renderTwoNews() }     
      </React.Fragment>
    )
  }  
}

function mapDispatchToProps(dispatch) {
  return {
    homePageTwoNews: () => dispatch(homePageTwoNews())
  }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(LastNews))
