import React, { Component, useState, useEffect } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Map=()=>{
  const { kakao } = window;
    useEffect(()=>{
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
        level: 3
      };
      var map = new kakao.maps.Map(container, options);
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
      }, [])
  
  
      return (
          <div className='Map'>
              <div id="map" style={{width:"100vw", height:"90vh"}}></div>
              <p id ="result">asd</p>
              <LeftSide/>
              <RightSide/>
          </div>
      )
  }
export default Map;