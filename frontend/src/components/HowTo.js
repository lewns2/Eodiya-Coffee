import React, { Component } from "react";
import Slider from "react-slick";

export default class HowTo extends Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 2
    };
    return (
        <Slider {...settings}>
          <div>
            <img src="/assets/caffeetwo.png" alt="HwTo"/>
          </div>
          <div>
            <img src="/assets/checkfile.png" alt="owTo"/>
          </div>
          <div>
            <img src="/assets/diary.png" alt="HowT"/>
          </div>
          <div>
            <img src="/assets/mapread.png" alt="Howo"/>
          </div>
        </Slider>
    );
  }
}