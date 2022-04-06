import React from "react";
import '../styles/Main.css';
import '../assets/mapread.png';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, CardActionArea, CardActions } from '@mui/material';

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
    }, []);
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
                <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 7,
                    width: 250,
                    height: 250,
                    },
                }}
                >
                <Paper sx={{display: 'flex', flexDirection:"column", alignItems:"center"}} elevation={3}>
                    <img className="imgSec" src={ require('../assets/mapread.png') }  alt="사진"/>
                    <p className="m-15">카페 창업에 좋은 위치를 알고 싶을때!</p>
                </Paper>
                <Paper sx={{display: 'flex', flexDirection:"column", alignItems:"center"}} elevation={3}>
                    <img className="imgSec" src={ require('../assets/checkfile.png') }  alt="사진"/>
                    <p className="m-15">주변에 어떤 상권 정보가 필요할 때!</p>
                </Paper>
                <Paper sx={{display: 'flex', flexDirection:"column", alignItems:"center"}} elevation={3}>
                    <img className="imgSec" src={ require('../assets/caffeetwo.png') }  alt="사진"/>
                    <p className="m-15">카페의 타겟층을 특정하고 싶을때</p>
                </Paper>
                <Paper sx={{display: 'flex', flexDirection:"column", alignItems:"center"}} elevation={3}>
                    <img className="imgSec" src={ require('../assets/diary.png') }  alt="사진"/>
                    <p className="m-15">주변 카페 정보를 알고 싶을때!</p>
                </Paper>
                </Box>
            </div>
            <div className="InLine" ref={oneRef} onWheel = {(e) =>updown(1, e)}>
                <div className="innerSec">
                    <img className="imgSec2" src={require('../assets/검색그래프.png')} alt="사진"/><p className="m-15"> 카페 창업을 위한 위치를 정하고 분석하면 선택 위치의 카페의 개/폐업률, 사용 주 연령대 층, 해당 위치 근처의 주 상권, 근처 편의시설의 수 등의 정보를 확인 하고 있습니다.</p>
                </div>
            </div>
            <div className="InLine" ref={twoRef} onWheel = {(e) =>updown(2, e)}>
                <div className="innerSec2">
                    <p className="m-15"> 카페 창업을 위한 위치를 정하고 분석하면 선택 위치의 카페의 개/폐업률, 사용 주 연령대 층, 해당 위치 근처의 주 상권, 근처 편의시설의 수 등의 정보를 확인 하고 있습니다.</p><img className="imgSec2" src={require('../assets/검색그래프.png')} alt="사진"/>
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