import React, { Component } from 'react';
import './App.css';
import Layout from './hos/Layout';
import OneNews from './pages/OneNews/OneNews';
import News from './pages/News/News'; 
import ImgGallery from './pages/ImgGallery/ImgGallery';  
import VideoGalery from './pages/VideoGalery/VideoGalery'; 
import Home from './pages/Home/Home';  
import Admin from './pages/Admin/Admin'; 
import Page404 from './UI/Page404/Page404' 
import {Route, Switch} from 'react-router-dom' 
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <BrowserRouter> 
      <Layout>
        <div className="App">
          <Switch>            
            <Route path='/news/:id' component={OneNews}/>  
            <Route path='/imggalery' component={ImgGallery}/>
            <Route path='/videogalery' component={VideoGalery}/>       
            <Route path='/news' component={News}/>  
            {this.props.auth &&  <Route path='/admin' component={Admin}/> }   
            <Route path='/' exact component={Home}/>           
            <Route component={Page404} />
          </Switch>
        </div>
      </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps (state) {
  return {
    auth: state.menuReducer.auth
  }
}

export default connect(mapStateToProps)(App);
