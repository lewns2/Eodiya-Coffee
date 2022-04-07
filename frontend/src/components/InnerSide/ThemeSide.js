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

const ThemeSide = () => {
    
    // 몇번째 테마인지
    const themeNum = useSelector(state => state.setMap.eodiyaMap.themeNum);
    // 백에서 넘겨준 데이터 전부
    const themeGuData = useSelector(state => state.setMap.eodiyaMap.themeGuData);
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
        console.log(index);
        console.log(themeGuData);
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
                name: "생활인구 1명 당 매출액",
                data: [themeGuData[0].revenue_per_one_person, themeGuData[1].revenue_per_one_person, themeGuData[2].revenue_per_one_person, themeGuData[3].revenue_per_one_person, themeGuData[4].revenue_per_one_person]
            }])
        }else if(themeNum == 7){
            setSeries([{
                name: "10대와 20대 생활인구 수",
                data: [themeGuData[0].peopleTotal, themeGuData[1].peopleTotal, themeGuData[2].peopleTotal, themeGuData[3].peopleTotal, themeGuData[4].peopleTotal]
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
    );
}

export default ThemeSide;