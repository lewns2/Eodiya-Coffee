import React, {  Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Box from '@mui/material/Box';

function chartData(arg, value){
    return {arg, value};
}

const data = [
    chartData('개업', 13),
    chartData('폐업', 8),
];

const Visual = () => {
    return (
        <Fragment>
            <h3>개업/ 폐업시각화</h3>
            <Box
            sx={{
                display: 'flex',
              }}
            >
                <Paper>
                    <Chart
                        data={data}
                        width="300"
                        height={300}
                    >
                        <PieSeries
                            valueField="value"
                            argumentField="arg"
                            innerRadius={0.6}
                        />
                    </Chart>
                </Paper>
            </Box>
        </Fragment>
    );
}

export default Visual;