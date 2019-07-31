import React from 'react'
import classNames from 'classnames/bind';
import './Slider.css'
import singapore from '../../img/slider/singapore.jpg'
import paris from '../../img/slider/paris.jpg'
import prague from '../../img/slider/prague.jpg'
import amsterdam from '../../img/slider/amsterdam.jpg'
import moscow from '../../img/slider/moscow.jpg'

export const slides = [
  {
    city: 'Paris',
    country: 'France',
    img: paris,
  },
  {
    city: 'Singapore',
    img: singapore
  },
  {
    city: 'Prague',
    country: 'Czech Republic',
    img: prague,
  },
  {
    city: 'Amsterdam',
    country: 'Netherlands',
    img: amsterdam,
  },
  {
    city: 'Moscow',
    country: 'Russia',
    img: moscow,
  },
];

class Slider extends React.Component {
  constructor(props) {
    super(props);
    
    this.IMAGE_PARTS = 4;
    
    this.changeTO = null;
    this.AUTOCHANGE_TIME = 8000; 
    
    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }
  
  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }
  
  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }
  
  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }
  
  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const length  = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length.length - 1;
    if (activeSlide >= length.length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }
  
  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      <div className={classNames('slider', { 's--ready': sliderReady })}>
        <p className="slider__top-heading">Travelers</p>
        <div className="slider__slides">
          {this.props.slides.map((slide, index) => (
            <div
              className={classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index  })}
              key={slide.city}
              >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split('').map((l, index) => <span key={index}>{l}</span>)}
                </h2>
                <p className="slider__slide-readmore">read more</p>
              </div>
              <div className="slider__slide-parts">
                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="slider__control" onClick={() => this.changeSlides(-1)} />
        <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
      </div>
    );
  }
}

export default Slider
