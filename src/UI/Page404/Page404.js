import React from 'react';
import './Page404.css'

const Page404 = (props) => {
  
  let {location: {pathname}} = props
  
  return (
    <>
      <div className="errorPage" style={pathname.indexOf('admin') !== -1 ? {width: '100%'} : null }> 
      <img className="homer" src={require('../../img/page404/homer.jpg')}  alt=""/>
        <div className="errorPage_text">         
          <h2 className="errorPage_h2">Cтраницы не существует</h2>
          <p className="errorPage_404">Ошибка 404</p>
          <p className="buttonLink" onClick={() =>  props.history.push({pathname: '/'})}>На главную</p>
        </div>
      </div>       
    </>
  )
}

export default Page404