import React, {useEffect, useState} from 'react';
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
const gu =[
    "강남구","강동구","강북구","강서구","관악구","광진구","구로구",
    "금천구","노원구","도봉구","동대문구","동작구","마포구",
    "서대문구","서초구","성동구","성북구","송파구","양천구",
    "영등포구","용산구","은평구","종로구","중구","중랑구"
];
// const buttonList =() => {
//         //axios 카페 태그 받아오기

// }
const tag =[
    "스터디","디저트","키즈","브런치","무인","애견"
];
const Comm =(props) =>{
    var [selectgu, setSelectGu] = useState(""); //상권분석
    var [cafegu, setCafeGu] = useState("");     //카페현황 - 구
    var [cafeDong, setCafeDong] = useState(""); //카페현황 - 동
    var [displayDivision, setdisplayDivision] = useState(0);
    const handleSide = () =>{
        console.log(props.open);
        props.getOpen(true);
    }

    const guList = () => {
        var n =1;
        const result = [];
        for(let i=0; i<gu.length; i++){
            result.push(<MenuItem value={n++}>{gu[i]}</MenuItem>)
        }
        return result;
    }
    const handleCafeSelect = (e) => {
        console.log("카페 클릭: "+e.target.value);
        setCafeGu(e.target.value);
        // GuDong.map()
        // console.log(GuDong.length);
        props.getGuCafe(cafegu);
    }
    const cafeDongList = () => {
        const arr = [];
        for(let i=0; i<GuDong.length; i++){
            // console.log(GuDong[i][0]);
            if(GuDong[i][0] === cafegu){
                arr.push(<MenuItem value={GuDong[i][1]}>{GuDong[i][1]}</MenuItem>)
            }
        }
        return arr;
    }
    const cafeGuList = () => {
        const cafeGu = [];
        for(let i =0; i<gu.length; i++){
            cafeGu.push(<MenuItem value={gu[i]}>{gu[i]}</MenuItem>)
        }
        return cafeGu;
    }
    const handleDisplay = () => {
        displayDivision ^= 1;
        console.log("행정구 활성화 버튼", displayDivision);
        setdisplayDivision(displayDivision);
        // props.setdisplayDivision(displayDivision);
    }

    const handleCafeDong =(e) => {
        console.log(e.target.value);
        setCafeDong(e.target.value);
        props.getDongCafe(cafeDong);
    }

    function btnList() {
        const list = [];
        for(let i=0; i<tag.length; i++){
            list.push(<Button variant='outlined'>{tag[i]}</Button>)
        }
        return list;
        //카페 태그 가져오기
        // axios.get(`${BASE}/${}`)
        // .then()
    }
    const handleConsept=()=>{
        console.log("카페현황 클릭!");
        btnList();
    }
    // useEffect(() => {
    //     console.log("chaged:"+selectgu);
    //     // console.log(open);
        
    // },);
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
                <Typography>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectgu}
                            label="구"
                        >
                            {guList()}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">동</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="동"
                        >
                        </Select>
                    </FormControl>
                <Button variant='outlined' onClick={handleDisplay}>행정 구역보기</Button>
                <Button variant='outlined'>버튼</Button>
                <Button variant='outlined'>버튼</Button>
                <Button variant='outlined' color="secondary" onClick={handleSide} fullWidth>분석하기</Button>
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                onClick={handleConsept}
                >
                <Typography>카페 현황</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{m:1}}>
                        <InputLabel id="demo-simple-select-label">구</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={cafegu}
                            label="구"
                            onChange={handleCafeSelect}
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
                        >
                            {cafeDongList()}
                        </Select>
                    </FormControl>
                    <Stack spacing={1}>
                        {btnList()}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Comm;