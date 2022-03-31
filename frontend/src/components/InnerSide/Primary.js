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
function Primary() {
    return (
        <div>
            <h3>매출 지표</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>분기매출</TableCell>
                        <TableCell align="right">건단가</TableCell>
                        <TableCell align="right">매출 주 연령대</TableCell>
                        <TableCell align="right">매출 주 시간대</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.sales}
                        </TableCell>
                        <TableCell align="right">{row.perPrice}</TableCell>
                        <TableCell align="right">{row.age}</TableCell>
                        <TableCell align="right">{row.time}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3>업종 지표</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>점포수</TableCell>
                        <TableCell align="right">유사점포수</TableCell>
                        <TableCell align="right">개업 점포수/개업률</TableCell>
                        <TableCell align="right">폐업 점포수/폐업률</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {storeRows.map((storeRows) => (
                        <TableRow
                        key={storeRows.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {storeRows.count}
                        </TableCell>
                        <TableCell align="right">{storeRows.simCount}</TableCell>
                        <TableCell align="right">{storeRows.open}/{storeRows.openPer}%</TableCell>
                        <TableCell align="right">{storeRows.close}/{storeRows.closePer}%</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3>인구 지표</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>상주인구</TableCell>
                        <TableCell align="right">남성 상주 인구</TableCell>
                        <TableCell align="right">여성 상주 인구</TableCell>
                        <TableCell align="right">가수 수</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {populRows.map((populRows) => (
                        <TableRow
                        key={populRows.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {populRows.resident}명
                        </TableCell>
                        <TableCell align="right">{populRows.man}명</TableCell>
                        <TableCell align="right">{populRows.woman}명</TableCell>
                        <TableCell align="right">{populRows.household} 가구</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Primary;