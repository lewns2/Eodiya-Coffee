import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(sales, perPrice, age, time) {
    return { sales, perPrice, age, time };
}
function storeData(count, simCount, open, close, openPer, closePer) {
    return { count, simCount, open, close, openPer, closePer };
}
function populData(resident, man, woman, household) {
    return {resident, man, woman, household};
}
const rows = [
    createData('901만5,791원', '10,273원', '30대', '13~15시'),
];
const storeRows = [
    storeData(120, 10, 13, 8, 10.8, 0.06),
];
const populRows =  [
    populData('105,601', '63,201', '42,400', '33,101'),
];
function Primary({dongData}) {
    return (
        <div>
            <h3>매출 지표</h3>
            <TableContainer component={Paper}>
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
            </TableContainer>
            <h3>업종 지표</h3>
            <TableContainer component={Paper}>
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
                                {dongData.numberStore}개
                            </TableCell>
                            <TableCell align="right">{dongData.openingStore}개</TableCell>
                            <TableCell align="right">{dongData.closureStore}개</TableCell>
                            <TableCell align="right">{dongData.openingRate}</TableCell>
                            <TableCell align="right">{dongData.closureRate}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <h3>인구 지표</h3>
            <TableContainer component={Paper}>
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
            </TableContainer>
        </div>
    );
}

export default Primary;