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

import { useDispatch, useSelector } from "react-redux";
// import useCafeMarker from '../actions/useCafeMarker';

const { kakao } = window;
const Map=(props)=>{
    //분석하기 클릭하면 
    //카페 현황
    const [cafeGu, setCafeGu] = React.useState("");
    const [cafeDong, setCafeDong] = React.useState("");
    const getCafeGu = (cafeGu) =>{
      setCafeGu(cafeGu);
    }
    const getCafeDong = (cafeDong) =>{
      setCafeDong(cafeDong);
    }
   
    // 2. 검색 키워드를 관리하는 훅
    const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();
  // useCafeMarker();

  const { map } = useSelector(state => ({
    map : state.setMap.eodiyaMap.map,
  }))
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

      
      
    //주소-좌표 변환 객체 생성
      var geocoder = new kakao.maps.services.Geocoder();

      function move() {
        if(cafeGu !== "" && cafeDong !== ""){
          geocoder.addressSearch(cafeGu+' '+cafeDong, function(result, status){
            if(status === kakao.maps.services.Status.OK){
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              map.setLevel(4);
              map.panTo(coords);
            }
          })
        }

        // #4.3 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'idle', function() {
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
      });

      function searchAddrFromCoords(coords, callback) {
        // 좌표로 행정동 주소 정보를 요청합니다
        geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
      }

      // #4.4 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var infoDiv = document.getElementById('centerAddr');

            for(var i = 0; i < result.length; i++) {
                // 행정동의 region_type 값은 'H' 이므로
                if (result[i].region_type === 'H') {
                    infoDiv.innerHTML = result[i].address_name;
                    break;
                }
            }
        }    
      }
      


    }
    move();
    dispatch(actionCreators.setMap(map), [map]);
  },[cafeDong]);

  return (
    <div className="Map">
      <div id="map" style={{width:"100vw", height:"100vh"}}>
        <StyledEngineProvider injectFirst>
          <Search setSearchKeyword={setSearchKeyword}/>
          <Comm cafeGu={cafeGu} getCafeGu={getCafeGu} cafeDong={cafeDong} getCafeDong={getCafeDong}/>
          <RightSide/>
        </StyledEngineProvider >
      </div>
      {searchKeyword}
      <Fab id="centerAddr" className='Location' variant="extended" />
    </div>
  );  
}


export default Map;