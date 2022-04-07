import React from "react";
import '../styles/Main.css';
import '../assets/mapread.png';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import back from '../assets/back.png';
export default function Main(props){
    const zeroRef = React.useRef(null);
    const oneRef = React.useRef(null);
    const twoRef = React.useRef(null);
    const threeRef = React.useRef(null);
    const fourRef = React.useRef(null);
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
    const onFourClick = () => {
        fourRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                onFourClick();
            }
        }else if (a==2){
            if (e.deltaY > 0) {
                onThreeClick();
            }else{
                onZeroClick();
            }
        }else if (a==3){
            if (e.deltaY > 0) {
                onFourClick();
            }else{
                onOneClick();
            }
        }else if (a==4){
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
    var sectionStyle = {
        width: "100%",
        height: "50vh",
        backgroundImage: `url(${ back })`
      };
    return(
        <div className="OutLine">
            <div className="InLine" ref={zeroRef} onWheel = {(e) =>updown(0, e)} style={sectionStyle}>
                <section className="section"> 
                    <h2>카페 창업을 준비중이신가요?</h2>
                </section>
                <Box sx={{
                    marginTop: "75px",
                    width:100,
                    height: 50,
                    color: 'white',
                    // border: '3px dashed white',
                }} onClick={(e) =>updown(3,e)}>
                        알아보기
                </Box>
            </div>
            <div className="InLine" ref={oneRef} onWheel = {(e) =>updown(1, e)} >
					<header className="major">
                        <p>어디야는 빅데이터 분석을 통해 <br/>카페창업의 위치 선정을 도와주는 추천 시스템입니다.</p>
					</header>
                    <Grid container spacing={3} padding="100px" marginLeft='200px'>
                        <Grid item xs={4}>
                            <img className="imgSec" src={ require('../assets/checkfile.png') } alt="사진"/>
							<h3>좋은 위치를 알고 싶을 때</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <img className="imgSec" src={ require('../assets/caffeetwo.png') } alt="사진"/>
							<h3>주변 상권 정보가 필요할 때</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <img className="imgSec" src={ require('../assets/diary.png') } alt="사진"/>
							<h3>다른 카페 정보를 알고 싶을 때</h3>
                        </Grid>
                    </Grid>
            </div>
            <div className="InLine" ref={twoRef} onWheel = {(e) =>updown(2, e)} >
                <div className="innerSec">
                    <div >
						<header class="major" >
							<h3>&#9757; 알고 싶은 동네의 <br />상권 정보를 제공합니다.</h3>
						</header>
						<p>매출 지표, 주요 고객층, 주변 생활 인구, 인근 카페 수와 같은 정보를 알 수 있습니다.</p>
					</div>
                    <img className="imgSec2" src={require('../assets/검색그래프.png')} alt="사진"/>
                </div>
            </div>
            <div className="InLine" ref={threeRef} onWheel = {(e) =>updown(3, e)}>
                <div className="innerSec2">
                    <div>
                        <img className="imgSec2" src={require('../assets/검색그래프.png')} alt="사진"/>
					</div>
					<div>
						<header class="major">
							<h3>&#9996; 영업 중인 카페 정보를 제공합니다.</h3><br />
						</header>
						<p>입지 선정, 컨셉을 기획하기 위해 관심있는 지역의 카페 현황을 알아 보세요.</p>
					</div>
                </div>
            </div>
            <div className="InLineend" ref={fourRef} onWheel = {(e) =>updown(4, e)}>
                <header class="major">
						<h2>시작해볼까요?</h2>
				</header>
					<ul className="actionsSpecial">
						<Button variant="contained" component="span"  size="large" onClick={mainEnd}>
							시작하기
						</Button>
					</ul>
            </div>
            <div style={sectionStyle}>
                <p>프론트 : 김동현, 김윤지, 정인수 백엔드 : 박진성, 조영현, 최명재</p>
            </div>
        </div>
    );
}