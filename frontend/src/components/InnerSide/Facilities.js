import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../../styles/Primary.css"

function Facilities({facdongdata}) {
    const[dongData, setDongData] = useState({});

    useEffect(() => {
        if(facdongdata){
            setDongData(facdongdata)
        }
    },[facdongdata])

    return (
        <div>
            <h2 className='infoTable'>편의 시설</h2>
            <TableContainer className='infoTable' component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>병원</TableCell>
                        <TableCell align="right">약국</TableCell>
                        <TableCell align="right">은행</TableCell>
                        <TableCell align="right">슈퍼마켓</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.hospitalNumber}개
                            </TableCell>
                            <TableCell align="right">{dongData.pharmacyNumber}개</TableCell>
                            <TableCell align="right">{dongData.bankNumber}개</TableCell>
                            <TableCell align="right">{dongData.supermarketNumber}개</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 className='infoTable'>교육 시설</h2>
            <TableContainer className='infoTable' component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>유치원</TableCell>
                        <TableCell align="right">학교(초중고)</TableCell>
                        <TableCell align="right">대학교</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.kindergardenNumber}개
                            </TableCell>
                            <TableCell align="right">{dongData.schoolNumber}개</TableCell>
                            <TableCell align="right">{dongData.universityNumber}개</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 className='infoTable'>교통 시설</h2>
            <TableContainer className='infoTable' component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>버스터미널</TableCell>
                        <TableCell align="right">지하철역</TableCell>
                        <TableCell align="right">버스정거장</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.busTerminalNumber}개
                            </TableCell>
                            <TableCell align="right">{dongData.subwayNumber}개</TableCell>
                            <TableCell align="right">{dongData.busStopNumber}개</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <h2 className='infoTable'>기타 시설</h2>
            <TableContainer className='infoTable' component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>백화점</TableCell>
                        <TableCell align="right">극장</TableCell>
                        <TableCell align="right">숙박시설</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {dongData.departmentStoreNumber}개
                            </TableCell>
                            <TableCell align="right">{dongData.theaterNumber}개</TableCell>
                            <TableCell align="right">{dongData.hotelNumber}개</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <p>위 데이터는 해당 동의 상권 기반 데이터로 몇몇 장소는 상권에 포함되지 않아 누락될 수 있습니다.</p>
        </div>
    );
}

export default Facilities;