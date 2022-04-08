import React, { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import "../../styles/ThemeSide.css";
import Chart from "react-apexcharts";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const theme =["술카페", "커피전문점", "무인카페", "브런치카페", "키즈카페", "스터디카페", "보드게임카페", "디저트카페"];
const {kakao} = window;

const ThemeSide = () => {
    const { map, themeNum, themeGuData, guName, isLoading } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        themeNum : state.setMap.eodiyaMap.themeNum,
        themeGuData : state.setMap.eodiyaMap.themeGuData,
        guName : state.setMap.eodiyaMap.guNum,
        isLoading : state.setMap.eodiyaMap.isLoading,
    }))
    
    const [themeName, setThemeName] = useState("");
    const [dataExplain, setDataExplain] = useState("데이터가 넘어오는 중입니다 조금만 기다려주세요!");

    useEffect(()=>{
        setThemeName(theme[themeNum])
        if (themeNum == 0){
            setDataExplain("순위 기준은 해당 위치의 분기별 매출, 밤 시간대(17-24시)의 매출, 밤 시간대 생활인구 수에 가중치를 두어 상위 5개 추천합니다.");
        }else if(themeNum == 1){
            setDataExplain("순위 기준은 해당 위치의 1인당 소비금액(매출액/생활인구)과 카페의 수, 교통수단, 병원, 호텔, 학교,  극장 등 집객시설 수를 기준으로 가중치를 두어 상위 5개를 추천합니다.");
        }else if(themeNum == 2){
            setDataExplain("순위 기준은 해당 위치의 직장인구 수와 교통수단 수를 기준으로 가중치를 두어 상위 5개를 추천합니다.");
        }else if(themeNum == 3){
            setDataExplain("순위 기준은 해당 위치의 11시 ~ 14시 생활인구 기준으로 상위 5개를 추천 합니다. ");
        }else if(themeNum == 4){
            setDataExplain("순위 기준은 해당 위치의 유치원 초등학교 수의 합산과 30대 생활인구 수를 기준으로 가중치를 두어 상위 5개를 추천합니다.");
        }else if(themeNum == 5){
            setDataExplain("순위 기준은 해당 위치의 10대와 20대의 생활인구 수 상위 20개 상권 주변에 학교가 많은 상권들 상위 5개를 추천합니다. 학교가 있는 상권이 5개 미만이면 학교가 없는 상권중 가장 높은 순위부터 추천해줍니다.");
        }else if(themeNum == 6){
            setDataExplain("순위 기준은 해당 위치의 10대, 20대의 생활인구 수와 중학교, 고등학교, 대학교의 수의 합을 기준으로 상위 5개 추천합니다.");
        }else if(themeNum == 7){
            setDataExplain("순위 기준은 해당 위치의 20,30대 여성 생활인구 * (상권의 집객시설+10) * 상권의 아파트 평균시세를 기준으로 상위 5개를 추천 합니다.");
        }else{
            setDataExplain("");
        }
    }, [themeNum])
    const [series, setSeries] = useState([{
          name: "세대별 이용수 평균",
          data: [0, 0, 0, 0, 0]
        }]);
      const[options, setOptions] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['10대', '20대', '30대', '40대', '50대']
        },
      });
    const moveLoc= (index) =>{
        var lng = themeGuData[index].commercialAreaCenterXPoint;
        var lat = themeGuData[index].commercialAreaCenterYPoint;
        
        map.setLevel(5);
        map.panTo(new kakao.maps.LatLng(lat, lng));

    }
    const resetData = () =>{
        if (themeNum == 0){
            setSeries([{
                name: "저녁 총매출(17-24시)",
                data: [themeGuData[0].revenue_in_night, themeGuData[1].revenue_in_night, themeGuData[2].revenue_in_night, themeGuData[3].revenue_in_night, themeGuData[4].revenue_in_night]
            }])
        }else if(themeNum == 1){
            setSeries([{
                name: "생활인구 1명 당 매출액",
                data: [themeGuData[0].revenue_per_one_person, themeGuData[1].revenue_per_one_person, themeGuData[2].revenue_per_one_person, themeGuData[3].revenue_per_one_person, themeGuData[4].revenue_per_one_person]
            }])
        }else if(themeNum == 2){
            setSeries([{
                name: "상권 주변 회사원 수",
                data: [themeGuData[0].salarymanNumber, themeGuData[1].salarymanNumber, themeGuData[2].salarymanNumber, themeGuData[3].salarymanNumber, themeGuData[4].salarymanNumber]
            }])
        }else if(themeNum == 3){
            setSeries([{
                name: "11~14시 생활인구",
                data: [themeGuData[0].revenue1114, themeGuData[1].revenue1114, themeGuData[2].revenue1114, themeGuData[3].revenue1114, themeGuData[4].revenue1114]
            }])
        }else if(themeNum == 4){
            setSeries([{
                name: "상권 주변 학교들의 수(초등학교 + 유치원)",
                data: [themeGuData[0].schoolTotal, themeGuData[1].schoolTotal, themeGuData[2].schoolTotal, themeGuData[3].schoolTotal, themeGuData[4].schoolTotal]
            }])
        }else if(themeNum == 5){
            setSeries([{
                name: "10대와 20대 생활인구 수",
                data: [themeGuData[0].sum1020, themeGuData[1].sum1020, themeGuData[2].sum1020, themeGuData[3].sum1020, themeGuData[4].sum1020]
            }])
        }else if(themeNum == 6){
            setSeries([{
                name: "10대와 20대 생활인구 수",
                data: [themeGuData[0].peopleTotal, themeGuData[1].peopleTotal, themeGuData[2].peopleTotal, themeGuData[3].peopleTotal, themeGuData[4].peopleTotal]
            }])
        }else if(themeNum == 7){
            setSeries([{
                name: "20,30대 여성 생활인구",
                data: [themeGuData[0].life_people_female_sum2030, themeGuData[1].life_people_female_sum2030, themeGuData[2].life_people_female_sum2030, themeGuData[3].life_people_female_sum2030, themeGuData[4].life_people_female_sum2030]
            }])
        }else{
            setSeries([{
                name: "세대별 이용수 평균",
                data: [10, 20, 30, 40, 50] 
            }])
        }
    }
    useEffect(()=>{
        if(themeGuData.length != 0){
            setOptions(
                {
                    chart: {
                    id: "basic-bar"
                    },
                    xaxis: {
                    categories: [themeGuData[0].commercialAreaName, themeGuData[1].commercialAreaName, themeGuData[2].commercialAreaName, themeGuData[3].commercialAreaName, themeGuData[4].commercialAreaName]
                    },
                }
            )
        }
    }, [themeGuData]);
    return (
        <>
            <h2 className='m-20'>{guName} {themeName} <b className='font-blue'>TOP5</b></h2>
            {isLoading &&
            <Box sx={{ mx:"auto", textAlign:"center" }}>
                <CircularProgress />
            </Box>
            }
            {!isLoading &&
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>순위</TableCell>
                        <TableCell align="right">지역</TableCell>
                        <TableCell align="right">이동</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {themeGuData.map((recommRows, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell align="right">{recommRows.commercialAreaName}</TableCell>
                        <TableCell align="right"><Button onClick={()=>moveLoc(index)}>이동</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p className='m-20'>{dataExplain}</p>
            <div className='bgw'>
                <Chart
                options={options}
                series={series}
                type="bar"
                width={520}
                />
                <Button onClick={()=>resetData()}>그래프 표시</Button>
            </div>
            </>
            }
        </>
    );
}

export default ThemeSide;