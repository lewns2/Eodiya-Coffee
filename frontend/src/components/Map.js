import React, { Component, useState, useEffect, useRef } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import geojson from '../assets/TL_SCCO_SIG.json'

const { kakao } = window;

var mapCenter = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
const options = {
  center: mapCenter,
  level: 3
}


const Map=()=>{

    // 1. 지도를 담을 영역의 DOM 레퍼런스
    const container = useRef(null);

    // 2. 검색 키워드를 관리하는 훅
    const [searchKeyword, setSearchKeyword] = useState("");

    // 3. 행정 구역 보기 토글 버튼
    var [displayDivision, setdisplayDivision] = useState(0);

    const handleDisplay = () => {
      displayDivision ^= 1;
      console.log("행정구 활성화 버튼", displayDivision);
      setdisplayDivision(displayDivision);
    }
    

    useEffect(()=>{
      // + 기능 1. 지도 생성 및 화면 표시
        // 1.1 지도 생성 및 객체 리턴
      var map = new window.kakao.maps.Map(container.current, options);

        // 1.2 마커 생성 (중심부에)
      
      if(!displayDivision) {
        var marker = new kakao.maps.Marker({ 
          position: map.getCenter() 
        }); 
        
          // 1.3 지도에 마커를 표시합니다
        marker.setMap(map);
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
          // 1.4 클릭한 위도, 경도 정보를 가져옵니다 
        var latlng = mouseEvent.latLng;
  
        marker.setPosition(latlng);
          
        var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
        message += '경도는 ' + latlng.getLng() + ' 입니다';
          
        var resultDiv = document.getElementById('result'); 
         
        resultDiv.innerHTML = message;
      });
    }

    // + 기능 2. 검색 시 해당 위치로 이동한다.
    console.log("Map : ", searchKeyword, "로 변경되었음.")

    // 2.1 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();

    // 2.2 키워드로 장소를 검색
    ps.keywordSearch(searchKeyword, placesSearchCB);

    // 2.3 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 2.4 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    // + 기능 3. 서울시 행정구 표시
    const customOverlay = new kakao.maps.CustomOverlay({});
    // const infowindow = new kakao.maps.InfoWindow({ removable: true });
    
    let data = geojson.features;
    let coordinates = [];
    let name = '';
    let polygons = [];

    const displayArea = (coordinates, name) => {
      let path = [];
      let points = [];
      
      coordinates[0].forEach((coordinate) => {
        let point = {};
        point.x = coordinate[1];
        point.y = coordinate[0];
        points.push(point);
        path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
      });
    

    let polygon = new kakao.maps.Polygon({
      map : map,
      path: path,
      strokeWeight: 2, // 선의 두께입니다
      strokeColor: '#004c80', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일입니다
      fillColor: '#fff', // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
    });
    polygons.push(polygon);

    // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
    // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
    kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
      polygon.setOptions({ fillColor: '#09f' });

      customOverlay.setContent('<div class="area">' + name + '</div>');

      customOverlay.setPosition(mouseEvent.latLng);
      customOverlay.setMap(map);
    });

    // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
    kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
      customOverlay.setPosition(mouseEvent.latLng);
    });

    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
    // 커스텀 오버레이를 지도에서 제거합니다
    kakao.maps.event.addListener(polygon, 'mouseout', function () {
      polygon.setOptions({ fillColor: '#fff' });
      customOverlay.setMap(null);
    });
  }

  data.forEach((val) => {
    coordinates = val.geometry.coordinates;
    name = val.properties.SIG_KOR_NM;
    if(displayDivision) {
      displayArea(coordinates, name);
    }
  })

},)
  
      return (
          <div className='Map'>
              
              <div 
                // id="map" 
                style={{width:"100vw", height:"90vh"}}
                ref = {container}
              ></div>
              <p 
                id ="result"
              >
                  asd
              </p>
              <LeftSide setSearchKeyword={setSearchKeyword}/>
              <RightSide/>
              <button type="submit" onClick={handleDisplay} style={{width:"100vw"}}>행정 구역 보기</button>
              
          </div>
      )
}
export default Map;