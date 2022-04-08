import React, {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../styles/Comm.css';
import GuDong from '../utils/GuDong.json';
import axios from 'axios';
import actionCreators from '../actions/actionCreators';
import useSelectDongData from '../actions/useSelectDongData';

import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import ChildCareRoundedIcon from '@mui/icons-material/ChildCareRounded';
import PetsIcon from '@mui/icons-material/Pets';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import EmojiFoodBeverageRoundedIcon from '@mui/icons-material/EmojiFoodBeverageRounded';
import RollerSkatingRoundedIcon from '@mui/icons-material/RollerSkatingRounded';
import SportsBarRoundedIcon from '@mui/icons-material/SportsBarRounded';

import { useSelector, useDispatch } from "react-redux";
import useSetThemeMarker from "../actions/useSetThemeMarker";
import useCafeMarker from '../actions/useCafeMarker';

const gu =[
    "강남구","강동구","강북구","강서구","관악구","광진구","구로구",
    "금천구","노원구","도봉구","동대문구","동작구","마포구",
    "서대문구","서초구","성동구","성북구","송파구","양천구",
    "영등포구","용산구","은평구","종로구","중구","중랑구", "서울시"];

const dong = [['신사동', '논현1동', '논현2동', '압구정동', '청담동', '삼성1동', '삼성2동', '대치1동', '대치2동', '대치4동', '역삼1동', '역삼2동', '도곡1동', '도곡2동', '개포1동', '개포2동', '개포4동', '세곡동', '일원본동', '일원1동', '일원2동', '수서동']
        , ['강일동', '상일동', '명일1동', '명일2동', '고덕1동', '고덕2동', '암사1동', '암사2동', '암사3동', '천호1동', '천호2동', '천호3동', '성내1동', '성내2동', '성내3동', '길동', '둔촌1동', '둔촌2동']
        , ['삼양동', '미아동', '송중동', '송천동', '삼각산동', '번1동', '번2동', '번3동', '수유1동', '수유2동', '수유3동', '우이동', '인수동']
        , ['염창동', '등촌1동', '등촌2동', '등촌3동', '화곡1동', '화곡2동', '화곡3동', '화곡4동', '화곡본동', '화곡6동', '화곡8동', '가양1동', '가양2동', '가양3동', '발산1동', '우장산동', '공항동', '방화1동', '방화2동', '방화3동']
        , ['보라매동', '청림동', '성현동', '행운동', '낙성대동', '청룡동', '은천동', '중앙동', '인헌동', '남현동', '서원동', '신원동', '서림동', '신사동', '신림동', '난향동', '조원동', '대학동', '삼성동', '미성동', '난곡동']
        , ['화양동', '군자동', '중곡1동', '중곡2동', '중곡3동', '중곡4동', '능동', '광장동', '자양1동', '자양2동', '자양3동', '자양4동', '구의1동', '구의2동', '구의3동']
        , ['신도림동', '구로1동', '구로2동', '구로3동', '구로4동', '구로5동', '가리봉동', '고척1동', '고척2동', '개봉1동', '개봉2동', '개봉3동', '오류1동', '오류2동', '수궁동']
        , ['가산동', '독산1동', '독산2동', '독산3동', '독산4동', '시흥1동', '시흥2동', '시흥3동', '시흥4동', '시흥5동']
        , ['월계1동', '월계2동', '월계3동', '공릉1동', '공릉2동', '하계1동', '하계2동', '중계본동', '중계1동', '중계4동', '중계2.3동', '상계1동', '상계2동', '상계3.4동', '상계5동', '상계6.7동', '상계8동', '상계9동', '상계10동']
        , ['창1동', '창2동', '창3동', '창4동', '창5동', '도봉1동', '도봉2동', '쌍문1동', '쌍문2동', '쌍문3동', '쌍문4동', '방학1동', '방학2동', '방학3동']
        , ['용신동', '제기동', '전농1동', '전농2동', '답십리1동', '답십리2동', '장안1동', '장안2동', '청량리동', '회기동', '휘경1동', '휘경2동', '이문1동', '이문2동']
        , ['노량진1동', '노량진2동', '상도1동', '상도2동', '상도3동', '상도4동', '흑석동', '사당1동', '사당2동', '사당3동', '사당4동', '사당5동', '대방동', '신대방1동', '신대방2동']
        , ['아현동', '공덕동', '도화동', '용강동', '대흥동', '염리동', '신수동', '서강동', '서교동', '합정동', '망원1동', '망원2동', '연남동', '성산1동', '성산2동', '상암동']
        , ['천연동', '북아현동', '충현동', '신촌동', '연희동', '홍제1동', '홍제3동', '홍제2동', '홍은1동', '홍은2동', '남가좌1동', '남가좌2동', '북가좌1동', '북가좌2동']
        , ['서초1동', '서초2동', '서초3동', '서초4동', '잠원동', '반포본동', '반포1동', '반포2동', '반포3동', '반포4동', '방배본동', '방배1동', '방배2동', '방배3동', '방배4동', '양재1동', '양재2동', '내곡동']
        , ['왕십리2동', '왕십리도선동', '마장동', '사근동', '행당1동', '행당2동', '응봉동', '금호1가동', '금호2.3가동', '금호4가동', '옥수동', '성수1가1동', '성수1가2동', '성수2가1동', '성수2가3동', '송정동', '용답동']
        , ['성북동', '삼선동', '동선동', '돈암1동', '돈암2동', '안암동', '보문동', '정릉1동', '정릉2동', '정릉3동', '정릉4동', '길음1동', '길음2동', '종암동', '월곡1동', '월곡2동', '장위1동', '장위2동', '장위3동', '석관동']
        , ['풍납1동', '풍납2동', '거여1동', '거여2동', '마천1동', '마천2동', '방이1동', '방이2동', '오륜동', '오금동', '송파1동', '송파2동', '석촌동', '삼전동', '가락본동', '가락1동', '가락2동', '문정1동', '문정2동', '장지동', '위례동', '잠실본동', '잠실2동', '잠실3동', '잠실4동', '잠실6동', '잠실7동']
        , ['목1동', '목2동', '목3동', '목4동', '목5동', '신월1동', '신월2동', '신월3동', '신월4동', '신월5동', '신월6동', '신월7동', '신정1동', '신정2동', '신정3동', '신정4동', '신정6동', '신정7동']
        , ['영등포본동', '영등포동', '여의동', '당산1동', '당산2동', '도림동', '문래동', '양평1동', '양평2동', '신길1동', '신길3동', '신길4동', '신길5동', '신길6동', '신길7동', '대림1동', '대림2동', '대림3동']
        , ['후암동', '용산2가동', '남영동', '청파동', '원효로1동', '원효로2동', '효창동', '용문동', '한강로동', '이촌1동', '이촌2동', '이태원1동', '이태원2동', '한남동', '서빙고동', '보광동']
        , ['녹번동', '불광1동', '불광2동', '갈현1동', '갈현2동', '구산동', '대조동', '응암1동', '응암2동', '응암3동', '역촌동', '신사1동', '신사2동', '증산동', '수색동', '진관동']
        , ['청운효자동', '사직동', '삼청동', '부암동', '평창동', '무악동', '교남동', '가회동', '종로1.2.3.4가동', '종로5.6가동', '이화동', '혜화동', '창신1동', '창신2동', '창신3동', '숭인1동', '숭인2동']
        , ['소공동', '회현동', '명동', '필동', '장충동', '광희동', '을지로동', '신당동', '다산동', '약수동', '청구동', '신당5동', '동화동', '황학동', '중림동']
        , ['면목2동', '면목4동', '면목5동', '면목본동', '면목7동', '면목3.8동', '상봉1동', '상봉2동', '중화1동', '중화2동', '묵1동', '묵2동', '망우본동', '망우3동', '신내1동', '신내2동']];

const tags =[
        "브런치", "키즈", "반려동물", "오락", "책", "디저트", "커피전문", "공부", "다방", "테마", "카페Bar" 
    ];

const theme =["술카페", "커피전문점", "무인카페", "브런치카페", "키즈카페", "스터디카페", "보드게임카페", "디저트카페"];
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};
//            브런치                    키즈                    반려동물        오락                        책                          디저트                  커피                공부                    다방                테마            bar
const icon = [<RestaurantRoundedIcon/>, <ChildCareRoundedIcon/>, <PetsIcon/>, <VideogameAssetRoundedIcon/>, <MenuBookRoundedIcon/>, <CakeRoundedIcon/>,<CoffeeRoundedIcon/> ,<LibraryBooksRoundedIcon/>,<EmojiFoodBeverageRoundedIcon/>, <RollerSkatingRoundedIcon/>,<SportsBarRoundedIcon/>];

const {kakao} = window;

const Comm =({cafeGu, getCafeGu, cafeDong, getCafeDong}) =>{
    var [selectgu, setSelectGu] = useState(0);          //상권분석
    var [selectdong, setSelectDong] = useState(0);      
    var [selecttheme, setSelectTheme] = useState(0);
    
    const dispatch = useDispatch();
    const {getSelectedDongData} = useSelectDongData();
    const { setThemeMarker } = useSetThemeMarker();
    const { setCafeMarker } = useCafeMarker();

    const { map, guMarker, guOverlay, guArray, themeAreaData, cafeMarker, sanggwonAreaData } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        guMarker : state.setMap.eodiyaMap.guMarker,
        guOverlay : state.setMap.eodiyaMap.guOverlay,
        guArray : state.setMap.eodiyaMap.guArray,
        themeAreaData : state.setMap.eodiyaMap.themeAreaData,
        cafeMarker : state.setMap.eodiyaMap.cafeMarker,
        sanggwonAreaData : state.setMap.eodiyaMap.sanggwonAreaData,
    }))
    
    const handleSide = () => {
        themeAreaData.map(value => {
            value.setMap(null);
        })

        cafeMarker.map(value => {
            value.setMap(null);
        })

        sanggwonAreaData.map(value => {
            value.setMap(null);
        })

        if(selectgu == 25){
            alert("지역을 선택해주세요");
        }else{
            getSelectedDongData(gu[selectgu], dong[selectgu][selectdong]);
        }
        
    }
    const handleThemeSide = () =>{
        dispatch(actionCreators.setIsLoading(true));
        var URL = "recommendation/recommend/"
        if (selecttheme == 0){
            URL = URL + "cafebar/"
        }else if(selecttheme == 1){
            URL = URL + "coffee/"
        }else if(selecttheme == 2){
            URL = URL + "machine/"
        }else if(selecttheme == 3){
            URL = URL + "brunch/"
        }else if(selecttheme == 4){
            URL = URL + "kids/"
        }else if(selecttheme == 5){
            URL = URL + "study/"
        }else if(selecttheme == 6){
            URL = URL + "play/"
        }else if(selecttheme == 7){
            URL = URL + "dessert/"
        }
        if(selectgu == 25){
            URL = URL + "none"
        }else{
            URL = URL + `${gu[selectgu]}`
        }
        axios
            .get(
                URL,
                {
                headers: {
                    "Content-type": "application/json",
                    Accept: "*/*",
                },
                }
            )
            .then((response) => {
                themeAreaData.map(value => {
                    value.setMap(null);
                })
                cafeMarker.map(value => {
                    value.setMap(null);
                })
                sanggwonAreaData.map(value => {
                    value.setMap(null);
                })
                setThemeMarker(response.data, selecttheme);
                if(selectgu == 25){
                    dispatch(actionCreators.setGuNum("서울시 전체"), [selectgu]);
                }else{
                    dispatch(actionCreators.setGuNum(gu[selectgu]), [selectgu]);
                }
                dispatch(actionCreators.setIsLoading(false));
                dispatch(actionCreators.setIsRightOpen(true), []);
                dispatch(actionCreators.setRightSideBarMode(2), []);
                dispatch(actionCreators.setThemeGuData(response.data), []);
                dispatch(actionCreators.setThemeNum(selecttheme), []);
            })
            .then(() => {
                guMarker.map(value => {
                    value.setMap(null);
                })
                guOverlay.map(value => {
                    value.setMap(null);
                })
                guArray.map(value => {
                    if(value.name === gu[selectgu]) {
                        map.setLevel(6);
                        map.panTo(new kakao.maps.LatLng(value.lat, value.lng));
                    }
                })
            })
    
            .catch((response) => {
                console.log("Error!");
                console.log(response, "from search");
            });
    }
    const guList = (a) => {
        
        const result = [];
        for(let i=0; i<gu.length-1+a; i++){
            result.push(<MenuItem key={i} value={i}>{gu[i]}</MenuItem>)
        }
        return result;
    }
    const dongList = () => {
        
        const result = [];
        if(dong[selectgu]){
            for(let i=0; i<dong[selectgu].length; i++){
                result.push(<MenuItem key={i} value={i}>{dong[selectgu][i]}</MenuItem>)
            }
        }
        return result;
    }
    const themeList = () => {
        const result = [];
        for(let i =0; i<theme.length; i++){
            result.push(<MenuItem key={i} value={i}>{theme[i]}</MenuItem>)
        }
        return result;
    }
    const handleCafeSelect = (e) => {
        getCafeGu(e.target.value);
        if(cafeDong !== ""){
            getCafeDong("");
        }
    }
    const cafeDongList = () => {
        const arr = [];
        for(let i=0; i<GuDong.length; i++){
            if(GuDong[i][0] === cafeGu){
                arr.push(<MenuItem key={i} value={GuDong[i][1]}>{GuDong[i][1]}</MenuItem>)
            }
        }
        return arr;
    }
    const cafeGuList = () => {
        const cafeGu = [];
        for(let i =0; i<gu.length-1; i++){
            cafeGu.push(<MenuItem key={i} value={gu[i]}>{gu[i]}</MenuItem>)
        }
        return cafeGu;
    }
    
    const handleGuSelect =(e) => {
        setSelectGu(e.target.value);
    }

    const handleDongSelect =(e) => {
        setSelectDong(e.target.value);
    }
    const handleThemeSelect =(e) => {
        setSelectTheme(e.target.value);
    }
    const handleCafeDong =(e) => {
        getCafeDong(e.target.value);
        dispatch(actionCreators.setCafeList([]));
    }

    function CafeList(t) {
        if(cafeGu === ""){
            alert("지역을 선택해주세요");
        }else if(cafeDong === ""){
            alert("지역을 선택해주세요");
        }else{
            axios
                .get(`/cafes/${cafeGu}/${cafeDong}/${t}`,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
                )
                .then(res =>{
                    if(res.data.length===1 &&'' ===res.data[0].dongCode){
                        alert('해당 하는 카페가 없어요. 다른 카테고리를 선택해주세요');
                    }else{
                        setCafeMarker(res.data);
                        dispatch(actionCreators.setCafeList(res.data));
                        
                    }
                })
                .catch(res =>{
                    console.log('서버랑 연결 실패');
                })
        }
    }
    function btnList() {
        //카페 태그 가져오기
        const list = [];
        for(let i=0; i<tags.length; i++){
            list.push(<Button variant='outlined' size='small' key={i} onClick={() =>CafeList(tags[i])} >{icon[i]}{tags[i]}</Button>)
            // list.push(<IconButton size='small' edge='end' key={i} onClick={() =>CafeList(tags[i])} >{tags[i]}</IconButton>)
        }
        return list;
    }

    return (
        <div className='Comm'>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>상권 분석</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectgu}
                            label="구"
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                            onChange={handleGuSelect}
                        >
                            {guList(0)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">동</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectdong}
                            label="동"
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                            onChange={handleDongSelect}
                        >
                            {dongList()}
                        </Select>
                    </FormControl>
                    <Button variant='outlined' onClick={handleSide} fullWidth>분석하기</Button>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>카페 현황</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cafeGu}
                            label="구"
                            onChange={handleCafeSelect}
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                        >
                            {cafeGuList()}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">동</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cafeDong}
                            label="동"
                            onChange={handleCafeDong}
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                        >
                            {cafeDongList()}
                        </Select>
                    </FormControl>
                    <Stack spacing={0.3} justifyContent="center">
                            {btnList()}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>테마 분석</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectgu}
                            label="구"
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                            onChange={handleGuSelect}
                        >
                            {guList(1)}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">테마</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selecttheme}
                            label="테마"
                            sx ={{minWidth: 100, maxHeight: 40}}
                            MenuProps={MenuProps}
                            onChange={handleThemeSelect}
                        >
                            {themeList()}
                        </Select>
                    </FormControl>
                    <Button variant='outlined' onClick={handleThemeSide} fullWidth>분석하기</Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
    
}

export default Comm;