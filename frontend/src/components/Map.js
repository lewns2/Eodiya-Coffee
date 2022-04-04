import React, {useEffect, useState} from 'react';
// import markerImg from '../assets/marker.png';
import { StyledEngineProvider } from '@mui/material/styles';
import { Fab } from '@mui/material';

import Search from './Search';
import Comm from './Comm';
import RightSide from '../components/Sidebar';

import actionCreators from '../actions/actionCreators';

import '../styles/Map.css';
import '../styles/Location.css'

import { useDispatch } from "react-redux";

const { kakao } = window;


const Map=(props)=>{
    //분석하기 클릭하면 
    const [open, setOpen] = React.useState(false);
    const [dongData, setDongData] = React.useState([
      {
        quarterRevenue: "초기값",
        perRevenue: "초기값",
        ageGroup: "초기값",
        timeGroup: "초기값",
        numberStore: "초기값",
        openingStore: "초기값",
        closureStore: "초기값",
        openingRate: "초기값",
        closureRate: "초기값",
        likePeople: "초기값",
        maleLikePeople: "초기값",
        femaleLikePeople: "초기값"
      }
    ]);
    const getOpenfromsearch = (data) =>{
      setDongData(data);
      console.log("맵:",data);
    }
    const getOpen = (isopen) =>{
      setOpen(isopen);
    } 

    // 2. 검색 키워드를 관리하는 훅
    const [searchKeyword, setSearchKeyword] = useState("");
  
    const dispatch = useDispatch();

    
    useEffect(() => {
      
      // 1. 지도 객체 생성
      const container = document.getElementById('map');
      const options = {
        center : new kakao.maps.LatLng(37.56690518860781, 126.97808628226417),
        level : 8,
      };
      const map = new kakao.maps.Map(container, options);

      // 2. 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      // 2.1 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'zoom_changed', function() {        
      
      // 2.2 그냥 리덕스로 관리하자...모르겠다...
      if(map != null) {
          var level = map.getLevel();
          dispatch(actionCreators.setMaplevel(level));
        } 
      });

      
      // #4.4 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      // function displayCenterInfo(result, status) {
      //   if (status === kakao.maps.services.Status.OK) {
      //       var infoDiv = document.getElementById('centerAddr');

      //       for(var i = 0; i < result.length; i++) {
      //           // 행정동의 region_type 값은 'H' 이므로
      //           if (result[i].region_type === 'H') {
      //               infoDiv.innerHTML = result[i].address_name;
      //               break;
      //           }
      //       }
      //   }    
      // }

      dispatch(actionCreators.setMap(map), [map]); 

    }, []);

  return (
    <div className="Map">
      <div id="map" style={{width:"100vw", height:"90vh"}}>
        <StyledEngineProvider injectFirst>
          <Search setSearchKeyword={setSearchKeyword}/>
          <Comm open={open} getOpen={getOpen} getOpen2={getOpenfromsearch} />
          <RightSide open={open} dongData={dongData} getOpen={getOpen}/>
        </StyledEngineProvider >
      </div>
      <Fab id="centerAddr" className='Location' variant="extended" />
    </div>
  );  
}


export default Map;