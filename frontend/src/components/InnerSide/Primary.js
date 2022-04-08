import "../../styles/Primary.css"

import React, {  useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

function Primary() {
    const guselectName = useSelector(state => state.setMap.eodiyaMap.guNum);
    const dongselectName = useSelector(state => state.setMap.eodiyaMap.dongNum);
    const dongData = useSelector(state => state.setMap.eodiyaMap.searchedDongData);
    const [series1, setSeries1] = useState([0, 0])
    const [series2, setSeries2] = useState([0, 0])
    const [series3, setSeries3] = useState([
        {
          name: "세대별 이용수 평균",
          data: [0, 0, 0, 0, 0, 0]
        }
      ])

    useEffect(()=>{
        setSeries1([dongData.openingStore, dongData.closureStore]);
        setSeries2([dongData.maleLikePeople, dongData.femaleLikePeople]);
        setSeries3([
            {
              name: "세대별 이용수 평균",
              data: [dongData.likePeopleAge10, dongData.likePeopleAge20, dongData.likePeopleAge30, dongData.likePeopleAge40, dongData.likePeopleAge50, dongData.likePeopleAge60]
            }
          ]);
    }, [dongData]);

    const moneyDot = (str)=>{
        return str.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    const [options1, setOption1]= useState({
        chart: {
            width: 380,
            type: 'donut',
          },
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
      const[options3, setOption3] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['10대', '20대', '30대', '40대', '50대', '60대' ]
        },
      });
    return (
        <div>
            <h1>{guselectName} {dongselectName}</h1>
            
            <h2 className='m-Y'>매출 지표</h2>

            <h3 className='m-Y'>해당 동의 분기별 평균 매출은 
                <b className="font-red"> {moneyDot(dongData.quarterRevenue)}원</b>
                이며 주문당 평균 단가는 
                <b className="font-red"> {moneyDot(dongData.perRevenue)}원</b>
                입니다.
            </h3>
            <div className='m-Y' id="chart">
                <Chart
                options={options3}
                series={series3}
                type="bar"
                width={520}
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 주연령층은
            <b className="font-red"> {dongData.ageGroup}</b>
            이며<br/> 매출이 가장 높은 시간대는  
            <b className="font-red"> {dongData.timeGroup}</b>
            입니다.
            </h3>
            <hr/>
            <h2 className='m-Y'>업종 지표</h2>

            <h3 className='m-Y'>해당 동의 상권당 평균 카페의 수는 
                <b className="font-red"> {dongData.numberStore}점포</b>
                 입니다.
            </h3>
            <div id="chart">
                <Chart
                options={options1}
                series={series1}
                type="donut"
                width="520"
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 상권당 분기별 평균 <br/> 개업 점포수는 
                <b className="font-red"> {dongData.openingStore}점포</b>
                 이며
                <b className="font-red"> {dongData.openingRate}%</b>
                 입니다. <br/>폐업 점포수는
                <b className="font-red"> {dongData.closureStore}점포</b>
                 이며
                <b className="font-red"> {dongData.closureRate}%</b>
                 입니다.
            </h3>
            <hr/>
            <h2 className='m-Y'>인구 지표</h2>

            <h3 className='m-Y'>해당 동의 상권당 평균 생활인구는
                <b className="font-red"> {dongData.likePeople}명</b>
                 입니다.
            </h3>
            <div id="chart">
                <Chart
                options={options2}
                series={series2}
                type="donut"
                width="520"
                />
            </div>
            <p>본 데이터는 동 별 평균 데이터이며 몇몇 지역은 크게 차이날 수 있습니다.</p>
            <h3 className='m-Y'>해당 동의 상권당 평균 생활인구는 <br/>남성이
                <b className="font-red"> {dongData.maleLikePeople}명</b>
                 이며, <br/>여성이
                <b className="font-red"> {dongData.femaleLikePeople}명</b>
                 입니다.
            </h3>
        </div>
    );
}

export default Primary;