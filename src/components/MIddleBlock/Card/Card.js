import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import {withRouter} from 'react-router-dom'


const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gridColumn: 'span 2',
  },
  media: {
    minHeight: 150,
    maxHeight: 150,
    height: 150,
    width: '100%',
    flexGrow: 1
  },
  buttonBlock: {
    justifyContent: 'flex-end',
    marginTop: 'auto'
  },
  topCardBlock: {
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }
};

const theme = createMuiTheme({ 
  palette: {
    primary: {
      main: '#455A64', 
    },
    secondary: {
      main: '#ccc'
    }
  },
  typography: {
    useNextVariants: true,
  },

});

const OneCard = (props) => {
  
  const { classes } = props;

  return <MuiThemeProvider theme={theme}>
      <Card className={classes.card}>
        <CardActionArea className={classes.topCardBlock}>
          <CardMedia className={classes.media} image={props.imgName} title="Contemplative Reptile" />
          <CardContent >
            <Typography gutterBottom variant="h5" component="h2">
              {props.name}
            </Typography>
            <Typography component="p">
            {props.text}           
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.buttonBlock}>
          <Button 
            size="small" 
            color="primary" 
            onClick={() => {
              props.history.push({pathname: props.path})
              document.documentElement.scrollTop = 0 
            }}
          >
            Перейти
          </Button>
        </CardActions>
      </Card>
    </MuiThemeProvider>;
} 

export default withRouter(withStyles(styles)(OneCard))