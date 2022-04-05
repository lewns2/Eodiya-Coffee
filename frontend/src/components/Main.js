import React from "react";
import '../styles/Main.css';
import '../assets/mapread.png';
import Button from '@mui/material/Button';

export default function Main(props){
    const zeroRef = React.useRef(null);
    const oneRef = React.useRef(null);
    const twoRef = React.useRef(null);
    const threeRef = React.useRef(null);

    const wheelTimeout = React.useRef()

    React.useEffect(() => {
        const cancelWheel = e => wheelTimeout.current && e.preventDefault()
        document.body.addEventListener('wheel', cancelWheel, {passive:false})
        return () => document.body.removeEventListener('wheel', cancelWheel)
    }, [])

    const onZeroClick = () => {
        zeroRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const onOneClick = () => {
        oneRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const onTwoClick = () => {
        twoRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const onThreeClick = () => {
        threeRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const mainEnd = () => {
        props.mainend();
    }
    const updown = (a, e) => {
        if (a == 0){
            if (e.deltaY > 0) {
                onOneClick();
            }else{
                onThreeClick();
            }
        }else if (a==1){
            if (e.deltaY > 0) {
                onTwoClick();
            }else{
                onZeroClick();
            }
        }else if (a==2){
            if (e.deltaY > 0) {
                onThreeClick();
            }else{
                onOneClick();
            }
        }else if (a==3){
            if (e.deltaY > 0) {
                onZeroClick();
            }else{
                onTwoClick();
            }
        }

        
        clearTimeout(wheelTimeout.current)
    
        // flag indicating to lock page scrolling (setTimeout returns a number)
        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = false
        }, 300)
    }
    return(
        <div className="OutLine">
            <div className="InLine" ref={zeroRef} onWheel = {(e) =>updown(0, e)}>
                <img src={require('../assets/Eodiya-removebg-preview.png')} alt="사진"/>
                <p>저희 Eodiya는 여러분의 빅데이터 분석으로 카페창업의 위치 선정을 도와주는 추천 시스템입니다.</p>
            </div>
            <div className="InLine" ref={oneRef} onWheel = {(e) =>updown(1, e)}>
                <h2>이런 사람에게 좋아요!</h2>
                <div className="innerSec">
                    <img className="imgSec" src={ require('../assets/mapread.png') }  alt="사진"/><p>어디에 어떤 환경이 카페 창업에 좋은 위치인지 모르는 경우!</p>
                </div>
                <div className="innerSec">
                    <p>이 주변에 창업을 하려고하는데 주변에 어떤 상권이 존재하는지 잘 모를때!</p><img className="imgSec" src={require('../assets/checkfile.png')} alt="사진"/>
                </div>
            </div>
            <div className="InLine" ref={twoRef} onWheel = {(e) =>updown(2, e)}>
                <h2>이런 사람에게 좋아요!</h2>
                <div className="innerSec">
                    <img className="imgSec" src={require('../assets/caffeetwo.png')} alt="사진"/><p>어떤 유형의 손님이 많이 찾는지 알고 싶을때!</p>
                </div>
                <div className="innerSec">
                    <p>카페 메뉴선정들 주변은 어떻게 하고 있는지 알고싶을때!</p><img className="imgSec" src={require('../assets/diary.png')} alt="사진"/>
                </div>
            </div>
            <div className="InLineend" ref={threeRef} onWheel = {(e) =>updown(3, e)}>
                <img src={require('../assets/Eodiya-removebg-preview.png')} alt="사진"/>
                <Button variant="contained" component="span"  size="large" onClick={mainEnd}>
                    시작하기
                </Button>
            </div>
            <p>프론트 : 김동현, 김윤지, 정인수 백 : 박진성, 조영현, 최명재</p>
        </div>
    );
}