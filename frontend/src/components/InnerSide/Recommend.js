import React, { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../../styles/Recommend.css"
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';


const Recommend = ({recoData}) => {
    const[dongData, setDongData] = useState([]);
    const[dongData1, setDongData1] = useState([]);
    const[dongData2, setDongData2] = useState([]);
    const[dongData3, setDongData3] = useState([]);

    const isLoading = useSelector(state => state.setMap.eodiyaMap.isLoading);

    useEffect(() => {
        if(recoData){
            setDongData(recoData.commercialAreaName);
            setDongData1(recoData.recommend1);
            setDongData2(recoData.recommend2);
            setDongData3(recoData.recommend3);
        }
    },[recoData])

    return (
        <Fragment>
            <h3 className='mm-15'>시장성 상권</h3>
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
                            <TableCell align="right">동별 평균 매출</TableCell>
                            <TableCell align="right">시장성</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {dongData1.map((recommRows, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{recommRows.commercialAreaName}</TableCell>
                            <TableCell align="right">{recommRows.dong_res}</TableCell>
                            <TableCell align="right">{recommRows.시장성}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>시장성: 상권 분기 매출액 / 점포수 - 동 분기 매출액 / 점포수</p>
                <h3 className='mm-15'>성장성 상권</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>순위</TableCell>
                            <TableCell align="right">지역</TableCell>
                            <TableCell align="right">성장성</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {dongData2.map((recommRows, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{recommRows.commercialAreaName}</TableCell>
                            <TableCell align="right">{recommRows.성장성}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>성장성: 이번 분기 매출액 / 전 분기 매출액</p>
                <h3 className='mm-15'>안전성 상권</h3>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>순위</TableCell>
                            <TableCell align="right">지역</TableCell>
                            <TableCell align="right">안정성</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {dongData3.map((recommRows, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {index+1}
                            </TableCell>
                            <TableCell align="right">{recommRows.commercialAreaName}</TableCell>
                            <TableCell align="right">{recommRows.안정성}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>안정성: 1 - (폐업 점포수 / 신규 점포수)(신규 점포가 없을때 0.5로 고정)</p>
            </>
            }
        </Fragment>
    );
}

export default Recommend;