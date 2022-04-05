import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../../styles/Primary.css"

function Primary({dongData}) {
    return (
        <div>
            <h2 className='infoTable'>매출 지표</h2>
            <TableContainer className='infoTable' component={Paper}>
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
            <h2 className='infoTable'>업종 지표</h2>
            <TableContainer className='infoTable' component={Paper}>
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
            </TableContainer>
            <h2 className='infoTable'>인구 지표</h2>
            <TableContainer className='infoTable' component={Paper}>
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