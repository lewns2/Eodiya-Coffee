import React, {useEffect, useState} from 'react';
import markerImg from '../assets/marker.png';
import { StyledEngineProvider } from '@mui/material/styles';

import Search from './Search';
import Comm from './Comm';
import RightSide from '../components/Sidebar';

import actionCreators from '../actions/actionCreators';
import useGetArea from '../actions/useGetArea';

import '../styles/Map.css';
import '../styles/Location.css'

import { useDispatch } from "react-redux";

const { kakao } = window;

const locationSeoulGu = [
  {latlng: new kakao.maps.LatLng(37.59491732, 126.9773213), name: "종로구"},
  {latlng: new kakao.maps.LatLng(37.56014356, 126.9959681), name: "중구"},
  {latlng: new kakao.maps.LatLng(37.53138497, 126.979907), name: "용산구"},
  {latlng: new kakao.maps.LatLng(37.55102969, 127.0410585), name: "성동구"},
  {latlng: new kakao.maps.LatLng(37.54670608, 127.0857435	), name: "광진구"},
  {latlng: new kakao.maps.LatLng(37.58195655, 127.0548481), name: "동대문구"},
  {latlng: new kakao.maps.LatLng(37.59780259, 127.0928803), name: "중랑구"},
  {latlng: new kakao.maps.LatLng(37.6057019, 127.0175795), name: "성북구"},
  {latlng: new kakao.maps.LatLng(37.64347391, 127.011189), name: "강북구"},
  {latlng: new kakao.maps.LatLng(37.66910208, 127.0323688), name: "도봉구"},
  {latlng: new kakao.maps.LatLng(37.65251105, 127.0750347), name: "노원구"},
  {latlng: new kakao.maps.LatLng(37.61921128, 126.9270229), name: "은평구"},
  {latlng: new kakao.maps.LatLng(37.57778531, 126.9390631), name: "서대문구"},
  {latlng: new kakao.maps.LatLng(37.55931349, 126.90827), name: "마포구"},
  {latlng: new kakao.maps.LatLng(37.52478941, 126.8554777), name: "양천구"},
  {latlng: new kakao.maps.LatLng(37.56123543, 126.822807), name: "강서구"},
  {latlng: new kakao.maps.LatLng(37.49440543, 126.8563006), name: "구로구"},
  {latlng: new kakao.maps.LatLng(37.46056756, 126.9008202), name: "금천구"},
  {latlng: new kakao.maps.LatLng(37.52230829, 126.9101695), name: "영등포구"},
  {latlng: new kakao.maps.LatLng(37.49887688, 126.9516415), name: "동작구"},
  {latlng: new kakao.maps.LatLng(37.46737569, 126.9453372), name: "관악구"},
  {latlng: new kakao.maps.LatLng(37.47329547, 127.0312203), name: "서초구"},
  {latlng: new kakao.maps.LatLng(37.49664389, 127.0629852), name: "강남구"},
  {latlng: new kakao.maps.LatLng(37.50561924, 127.115295), name: "송파구"},
  {latlng: new kakao.maps.LatLng(37.55045024, 127.1470118), name: "강동구"},
];


// // [임시] 영역 정보를 담을 전역 변수들
// const BASE = 'http://127.0.0.1:8000/api/v1';

// let area = [];

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
  const { getArea } = useGetArea();
  
  useEffect(() => {
    
    // 1. 지도 객체 생성
    const container = document.getElementById('map');
    const options = {
      center : new kakao.maps.LatLng(37.56690518860781, 126.97808628226417),
      level : 8,
    };
    const map = new kakao.maps.Map(container, options);

    // 2. 지도에 시군구동 이미지 마커 띄우기
    var imageSrc = markerImg; 

    for(var i=0; i<locationSeoulGu.length; i++) {

      var imageSize = new kakao.maps.Size(60, 60);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      var guName = locationSeoulGu[i].name
      
      
      var marker = new kakao.maps.Marker({
        position: locationSeoulGu[i].latlng,
        title : locationSeoulGu[i].name,
        image : markerImage,
        opacity : 0.8,  // 투명도
      });
      
      marker.setMap(map);

      // #2.1 마커 커스텀하기 => 정확히는 그냥 오버레이 덮어씌우기
      var content = guName;

      var position = locationSeoulGu[i].latlng;

      var customOverlay = new kakao.maps.CustomOverlay({
        map: map,
        clickable: true,
        position: position,
        content: content,
        yAnchor: 1.85,
        xAnchor : 0.45,
      });

        // #2.2 개별 마커 클릭 이벤트
        kakao.maps.event.addListener(marker, 'click', moveAndDisplayGuArea(marker, locationSeoulGu[i].latlng, locationSeoulGu[i].name));
    }
      
    // #2.3 줌인 & 마커 위치로 지도 이동
    function moveAndDisplayGuArea(customOverlay, loca, guName) {
      return function() {
        var moveLatLon = loca;
        map.setLevel(7); 
        map.panTo(moveLatLon);
        // console.log("actions로 가라");
        getArea(guName);
      }
    }

    // #4.4 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
          var infoDiv = document.getElementById('centerAddr');

          for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                  infoDiv.innerHTML = result[i].address_name;
                  // setNowLocation(result[i].address_name);
                  break;
              }
          }
      }    
    }

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
      {/* <Fab id="centerAddr" className='Location' variant="extended" /> */}
    </div>
  );  
}


export default Map;