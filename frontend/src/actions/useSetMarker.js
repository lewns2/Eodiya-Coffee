import { useSelector, useDispatch } from "react-redux";

import actionCreators from "./actionCreators";
import useGetArea from '../actions/useGetArea';

import markerImg from "../assets/marker.png"

const { kakao } = window;

var kakaoMap = {};
var guList = [];
var marker_old = [];
var guOverlay = [];

const useSetMarker = () => {
    
    const { map, guArray, guMarker } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        guArray : state.setMap.eodiyaMap.guArray,
        guMarker : state.setMap.eodiyaMap.guMarker,
    }))
    const dispatch = useDispatch();
    const { getArea } = useGetArea();

    kakaoMap = map;
    guList = guArray;
    marker_old = guMarker;

    const setMarker = () => {
        
        // marker 초기화
        marker_old.map(value => {
            value.setMap(null);
        })

        var marker_new = [];

        guList.map(value => {
            
            var imageSrc = markerImg;
            var imageSize = new kakao.maps.Size(60, 60);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            
            var marker = new kakao.maps.Marker({
                map: kakaoMap, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(value.lat, value.lng), // 마커를 표시할 위치
                title: value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage, // 마커 이미지 
            });

            const content = `<div class ="label">` +
                            `<span class="left"></span><span class="center">${value.name}</span>` +
                            `<span class="right"></span>` +
                         `</div>`;

            var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: new kakao.maps.LatLng(value.lat, value.lng),
                content: content,
                yAnchor: 1.85,
                xAnchor : 0.45,
            });

            guOverlay.push(customOverlay);
            marker_new.push(marker);
            kakao.maps.event.addListener(marker, 'click', moveAndDisplayGuArea(marker, value.lat, value.lng, value.name));

            // // #2.3 줌인 & 마커 위치로 지도 이동
            function moveAndDisplayGuArea(customOverlay, lat, lng, guName) {
                return function() {
                    map.setLevel(7); 
                    map.panTo(new kakao.maps.LatLng(lat, lng));
                    getArea(guName);
                }
            }
        })
        dispatch(actionCreators.addGuMarker(marker_new));
        dispatch(actionCreators.setGuOverlay(guOverlay));
        // console.log(marker_new);
        
        };
        return {setMarker};
}
    
    // console.log(markers);

export default useSetMarker;

// 2. 지도에 구 이미지 마커 띄우기
        // var imageSrc = markerImg; 
        
        // var imageSize = new kakao.maps.Size(60, 60);
    
        // for(var i=0; i<guList.length; i++) {

            
        //     // var imageSize = new kakao.maps.Size(60, 60); 
        
        //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            
        //     var marker = new kakao.maps.Marker({
        //         position: guList[i].latlng,
        //         title : guList[i].name,
        //         image : markerImage,
        //         opacity : 0.8,  // 투명도
        //     });
            
        //     // 마커를 따로 넣어주자.
        //     marker.setMap(kakaoMap);
        //     markers.push(marker);

        //     // #2.1 마커 커스텀하기 => 정확히는 그냥 오버레이 덮어씌우기
        //     var content = guList[i].name;

        //     var position = guList[i].latlng;

        //     var customOverlay = new kakao.maps.CustomOverlay({
        //         map: map,
        //         clickable: true,
        //         position: position,
        //         content: content,
        //         yAnchor: 1.85,
        //         xAnchor : 0.45,
        //     });

        //     // #2.2 개별 마커 클릭 이벤트
        //     kakao.maps.event.addListener(marker, 'click', moveAndDisplayGuArea(marker, guList[i].latlng, guList[i].name));
        // }
            
        // // #2.3 줌인 & 마커 위치로 지도 이동
        // function moveAndDisplayGuArea(customOverlay, loca, guName) {
        //     return function() {
        //         var moveLatLon = loca;
        //         map.setLevel(7); 
        //         map.panTo(moveLatLon);
        //         getArea(guName);
        //     }
        // }