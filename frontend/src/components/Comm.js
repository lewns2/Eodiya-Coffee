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

const gu =[
    "강남구","강동구","강북구","강서구","관악구","광진구","구로구",
    "금천구","노원구","도봉구","동대문구","동작구","마포구",
    "서대문구","서초구","성동구","성북구","송파구","양천구",
    "영등포구","용산구","은평구","종로구","중구","중랑구"];

const dong = [
    [1,"개포1동"],[1,"개포2동"],[1,"개포4동"],[1,"논현1동"],[1,"논현2동"],[1,"대치1동"],
    [1,"대치2동"],[1,"대치4동"],[1,"도곡1동"],[1,"도곡2동"],[1,"삼성1동"],[1,"삼성2동"],
    [1,"세곡동"],[1,"수서동"],[1,"신사동"],[1,"압구정동"],[1,"역삼1동"],[1,"역삼2동"],
    [1,"일원1동"],[1,"일원2동"],[1,"일원본동"],[1,"청담동"]
];
const Comm =({open, getOpen}) =>{
    var [selectgu, setSelectGu] = useState('1');
    
    var [displayDivision, setdisplayDivision] = useState(0);
    const handleSide = () =>{
        console.log(open);
        getOpen(true);
    }
    const guList = () => {
        var n =1;
        const result = [];
        for(let i=0; i<gu.length; i++){
            result.push(<MenuItem value={n++}>{gu[i]}</MenuItem>)
        }
        return result;
    }
    const handleDisplay = () => {
        displayDivision ^= 1;
        console.log("행정구 활성화 버튼", displayDivision);
        setdisplayDivision(displayDivision);
        // props.setdisplayDivision(displayDivision);
    }
    const dongList = () => {
        for(let i=0; i<dong.length; i++){
            // console.log(dong[i][0]);
            // console.log(setSelectGu+"");
        }
    }
    const handleSelect =(e) => {
        console.log("select: "+e.target.value);
        setSelectGu(e.target.value);
        console.log(selectgu);
        dongList();
    }
    useEffect(() => {
        console.log("chaged:"+selectgu);
        // console.log(open);
    },[]);
    return (
        <div className='Comm'>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>상권 현황</Typography>
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
                            onChange={handleSelect}
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
                >
                <Typography>카페 현황</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1}>
                        <Button variant='outlined'>스터디</Button>
                        <Button variant='outlined'>디저트</Button>
                        <Button variant='outlined'>키즈</Button>
                        <Button variant='outlined'>브런치</Button>
                        <Button variant='outlined'>무인</Button>
                        <Button variant='outlined'>애견</Button>
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Comm;