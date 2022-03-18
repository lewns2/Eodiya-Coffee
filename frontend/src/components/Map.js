import React, { Component, useState, useEffect, useRef } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Searchbar from './InnerSide/Searchbar';


const { kakao } = window;

const options = {
  center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
  level: 3
}


const Map=()=>{

    //지도를 담을 영역의 DOM 레퍼런스
    const container = useRef(null);
    const [keyword, setKeyword] = useState("");

    useEffect(()=>{
      //지도 생성 및 객체 리턴
      // var map = new kakao.maps.Map(container, options);
      var map = new window.kakao.maps.Map(container.current, options);
      
      var marker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: map.getCenter() 
      }); 
      
      // 지도에 마커를 표시합니다
      marker.setMap(map);
      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
        // 클릭한 위도, 경도 정보를 가져옵니다 
      var latlng = mouseEvent.latLng;

      marker.setPosition(latlng);
        
      var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
        
      var resultDiv = document.getElementById('result'); 
       
      resultDiv.innerHTML = message;
    });

    // +
    // 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워드로 장소를 검색
    ps.keywordSearch(keyword, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {

      // 마커를 생성하고 지도에 표시
      let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
    }
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
              <LeftSide/>
              <RightSide/>
              <Searchbar
                setKeyword={setKeyword}
              ></Searchbar>
              <h1>{keyword}</h1>
              
          </div>
      )
  }
export default Map;