import React, { Fragment } from 'react';
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
const recommRows = [
    recommendData('1', '**동', 100),
    recommendData('2', '@@동', 88),
    recommendData('3', '&&동', 77),
    recommendData('4', '$$동', 55),
    recommendData('5', '%%동', 11),
];
const Recommend = () => {

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
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {recommRows.map((recommRows) => (
                        <TableRow
                        key={recommRows.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {recommRows.rank}
                        </TableCell>
                        <TableCell align="right">{recommRows.dong}</TableCell>
                        <TableCell align="right">{recommRows.per}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
}

export default Recommend;