import React, {  Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import "../../styles/Visual.css"
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Box from '@mui/material/Box';

function chartData(arg, value){
    return {arg, value};
}

const Visual = ({dongData}) => {
    const openData = [
        chartData('개업', dongData.openingStore),
        chartData('폐업', dongData.closureStore),
    ];
    const genData = [
        chartData('남성', dongData.maleLikePeople),
        chartData('여성', dongData.femaleLikePeople),
    ];
    return (
        <Fragment>
            <h2 className='m-t'>개업/ 폐업시각화</h2>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
                <Paper className='graph'>
                    <Chart
                        data={openData}
                        width="300"
                        height={300}
                    >
                        <PieSeries
                            valueField="value"
                            argumentField="arg"
                            innerRadius={0.3}
                        />
                    </Chart>
                </Paper>
                <Box sx={{display:"flex", justifyContent: 'space-around' }}>
                    <div className='color1'></div><h3>개업</h3><div className='color2'></div><h3>폐업</h3> 
                </Box>
                <h2 className='m-t'>남여 성비</h2>
                <Paper className='graph'>
                    <Chart
                        data={genData}
                        width="300"
                        height={300}
                    >
                        <PieSeries
                            valueField="value"
                            argumentField="arg"
                            innerRadius={0.3}
                        />
                    </Chart>
                </Paper>
                <Box sx={{display:"flex", justifyContent: 'space-around' }}>
                    <div className='color1'></div><h3>남성</h3><div className='color2'></div><h3>여성</h3> 
                </Box>
            </Box>
        </Fragment>
    );
}

export default Visual;