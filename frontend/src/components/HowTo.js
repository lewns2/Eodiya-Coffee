import React, { Component } from "react"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import img1 from '../assets/caffeetwo.png';
import img2 from '../assets/diary.png';
import img3 from '../assets/checkfile.png';
import img4 from '../assets/mapread.png';


export default class HowTo extends Component {
  render() {
    const settings = { 
      dots: true,       //이동 버튼 true/false
      infinite: true,   //맨 끝 contents 끝나면 처음으로 이동
      speed: 500,       //속도 (ms)
      slidesToShow: 1,  //슬라이드 개수
      slidesToScroll: 1  //스클롤 한번에 넘어가는 개수
    };
    return ( 
    <div> 
      <Slider {...settings}> 
        <div > 
          <img src={img1} alt={1} height={400}/>
        </div> 
        <div> 
          <img src={img2} alt={2} height={400}/>
        </div> 
        <div> 
          <img src={img3} alt={3} height={400}/>
        </div> 
        <div> 
          <img src={img4} alt={4} height={400}/>
        </div> 
      </Slider> 
    </div> 
    );
    }
}