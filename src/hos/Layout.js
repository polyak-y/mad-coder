import React from 'react'
import ButtonAppBar from '../menu/ButtonAppBar/ButtonAppBar';
import Footer from '../Footer/Footer';

const Layout = (props) => {
  return (
    <React.Fragment>
       <ButtonAppBar />
       <main>
         {props.children}
       </main>
       <Footer />
    </React.Fragment>
  )
}

export default  Layout
