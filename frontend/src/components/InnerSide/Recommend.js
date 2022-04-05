import React, { Fragment, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function recommendData(rank, dong, per){
    return {rank, dong, per};
}

const Recommend = ({recoData}) => {
    const[dongData, setDongData] = useState({});

    useEffect(() => {
        if(recoData){
            setDongData(recoData)
        }
    },[recoData])

    return (
        <Fragment>
            <h3>추천 상권</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>순위</TableCell>
                        <TableCell align="right">지역</TableCell>
                        <TableCell align="right">성공 지수</TableCell>
                        <TableCell align="right">상권 현황</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {dongData.map((recommRows, index) => (
                        <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell align="right">{recommRows.commercialAreaName}</TableCell>
                        <TableCell align="right">{recommRows.commercialQuarterRevenue}</TableCell>
                        <TableCell align="right">{recommRows.commercialAreaChange}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default Recommend;