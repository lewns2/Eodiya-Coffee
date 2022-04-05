import React, {  Fragment, useEffect, useState } from 'react';
// import Paper from '@material-ui/core/Paper';
import "../../styles/Visual.css"
import Chart from "react-apexcharts";

// import {
//   Chart,
//   PieSeries,
// } from '@devexpress/dx-react-chart-material-ui';
import Box from '@mui/material/Box';

function chartData(arg, value){
    return {arg, value};
}

const Visual = ({dongData}) => {
    const [options1, setOption]= useState({
        chart: {
            width: 380,
            type: 'donut',
          },
        series: [dongData.openingStore, dongData.closureStore],
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
        series: [dongData.maleLikePeople, dongData.femaleLikePeople],
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
    //   const [options3, setOption3]= useState({
    //     chart: {
    //         width: 380,
    //         type: 'donut',
    //       },
    //     series: [dongData.likePeopleAge10, dongData.likePeopleAge20, dongData.likePeopleAge30, dongData.likePeopleAge40, dongData.likePeopleAge50, dongData.likePeopleAge60],
    //     labels: ['10대', '20대', '30대', '40대', '50대', '60대' ],
    //     responsive: [{
    //         breakpoint: 480,
    //         options: {
    //           chart: {
    //             width: 200
    //           },
    //           legend: {
    //             position: 'bottom'
    //           }
    //         }
    //       }]
    //   });
    return (
        <Fragment>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
                <h2 className='m-t'>개업/ 폐업시각화</h2>
                <div id="chart">
                <Chart
                options={options1}
                series={options1.series}
                type="donut"
                width="500"
                />
                </div>
                
                <h2 className='m-t'>남여 성비</h2>
                <div id="chart">
                <Chart
                options={options2}
                series={options2.series}
                type="donut"
                width="500"
                />
                </div>

                {/* <h2 className='m-t'>세대별 이용비율</h2>
                <div id="chart">
                <Chart
                options={options3}
                series={options3.series}
                type="donut"
                width="500"
                />
                </div> */}
            </Box>
        </Fragment>
    );
}

export default Visual;