// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import "../../styles/Primary.css"
import React, {  Fragment, useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";

function Primary() {
    const guselectName = useSelector(state => state.setMap.eodiyaMap.guNum);
    const dongselectName = useSelector(state => state.setMap.eodiyaMap.dongNum);
    const dongData = useSelector(state => state.setMap.eodiyaMap.searchedDongData);
    const [series1, setSeries1] = useState([0, 0])
    const [series2, setSeries2] = useState([0, 0])
    const [series3, setSeries3] = useState([
        {
          name: "세대별 이용수 평균",
          data: [0, 0, 0, 0, 0, 0]
        }
      ])

    useEffect(()=>{
        setSeries1([dongData.openingStore, dongData.closureStore]);
        setSeries2([dongData.maleLikePeople, dongData.femaleLikePeople]);
        setSeries3([
            {
              name: "세대별 이용수 평균",
              data: [dongData.likePeopleAge10, dongData.likePeopleAge20, dongData.likePeopleAge30, dongData.likePeopleAge40, dongData.likePeopleAge50, dongData.likePeopleAge60]
            }
          ]);
    }, [dongData]);

    const moneyDot = (str)=>{
        return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    const [options1, setOption1]= useState({
        chart: {
            width: 380,
            type: 'donut',
          },
        labels: ["개업", "폐업"],
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              },
            }
          }]
      });
      const [options2, setOption2]= useState({
        chart: {
            width: 380,
            type: 'donut',
          },
        labels: ['남성', '여성'],
        responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
      });
      const[options3, setOption3] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['10대', '20대', '30대', '40대', '50대', '60대' ]
        },
      });
    return (
        <div>
            <h1>{guselectName} {dongselectName}</h1>
            
            <h2 className='m-Y'>매출 지표</h2>
            {/* <TableContainer className='m-Y' component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>평균매출</TableCell>
                        <TableCell align="right">건단가</TableCell>
                        <TableCell align="right">매출 주 연령대</TableCell>
                        <TableCell align="right">매출 주 시간대</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.quarterRevenue}원
                            </TableCell>
                            <TableCell align="right">{dongData.perRevenue}원</TableCell>
                            <TableCell align="right">{dongData.ageGroup}</TableCell>
                            <TableCell align="right">{dongData.timeGroup}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> */}
            <h3 className='m-Y'>해당 동의 연 평균 매출은 
                <span> {moneyDot(dongData.quarterRevenue)}원</span>
                이며 주문당 평균 단가는 
                <span>{moneyDot(dongData.perRevenue)}원</span>
                으로 추정합니다.
            </h3>
            <div className='m-Y' id="chart">
                <Chart
                options={options3}
                series={series3}
                type="bar"
                width={520}
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 이용하는 세대는
            <span> {dongData.ageGroup}</span>
            이며 핫 타임은  
            <span> {dongData.timeGroup} </span>
            사이입니다.
            </h3>
            <hr/>
            <h2 className='m-Y'>업종 지표</h2>
            {/* <TableContainer className='m-Y' component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>점포수</TableCell>
                        <TableCell align="right">개업 점포수</TableCell>
                        <TableCell align="right">폐업 점포수</TableCell>
                        <TableCell align="right">개업률</TableCell>
                        <TableCell align="right">폐업률</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.numberStore}점포
                            </TableCell>
                            <TableCell align="right">{dongData.openingStore}점포</TableCell>
                            <TableCell align="right">{dongData.closureStore}점포</TableCell>
                            <TableCell align="right">{dongData.openingRate}</TableCell>
                            <TableCell align="right">{dongData.closureRate}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> */}
            <h3 className='m-Y'>해당 동의 평균 카페의 수는 
                <span> {dongData.numberStore}점포</span>
                 입니다.
            </h3>
            <div id="chart">
                <Chart
                options={options1}
                series={series1}
                type="donut"
                width="520"
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 개업 점포수는 평균적으로
                <span> {dongData.openingStore}점포</span>
                 이며
                <span> {dongData.openingRate}%</span>
                 입니다. 폐업 점포수는
                <span> {dongData.closureStore}점포</span>
                 이며
                <span> {dongData.closureRate}%</span>
                 입니다.
            </h3>
            <hr/>
            <h2 className='m-Y'>인구 지표</h2>
            {/* <TableContainer className='m-Y' component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>생활인구</TableCell>
                        <TableCell align="right">남성 생활 인구</TableCell>
                        <TableCell align="right">여성 생활 인구</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.likePeople}명
                            </TableCell>
                            <TableCell align="right">{dongData.maleLikePeople}명</TableCell>
                            <TableCell align="right">{dongData.femaleLikePeople}명</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> */}
            <h3 className='m-Y'>해당 동의 평균 생활인구는
                <span> {dongData.likePeople}명</span>
                 입니다.
            </h3>
            <div id="chart">
                <Chart
                options={options2}
                series={series2}
                type="donut"
                width="520"
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 생활인구는 남성이
                <span> {dongData.maleLikePeople}명</span>
                 이며, 여성이
                <span> {dongData.femaleLikePeople}명</span>
                 입니다.
            </h3>
        </div>
    );
}

export default Primary;