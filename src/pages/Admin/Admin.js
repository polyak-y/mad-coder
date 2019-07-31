import React from 'react';
import LayoutAdmin from '../../hos/LayoutAdmin'
import {Route, Switch} from 'react-router-dom' 
import SectionMenu from '../Admin/SectionMenu'



const Admin = () => { 
  return (  
    <LayoutAdmin>    
      <Switch>
        <Route path='/admin/:name' component={SectionMenu}/>               
      </Switch>    
    </LayoutAdmin>
  )
}

export default Admin