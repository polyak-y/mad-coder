import React from 'react';
import './Home.css'
import Slider, { slides } from '../../components/Slider/Slider';
import MIddleBlock from '../../components/MIddleBlock/MIddleBlock';

const Page = () => {
  return (
    <div className="home">
      <div className="mainSlider">
        <Slider slides={slides} />
      </div>
      <MIddleBlock />
    </div>
  )
}

export default Page