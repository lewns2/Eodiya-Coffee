import { useSelector, useDispatch } from "react-redux";

import actionCreators from "./actionCreators";
import useGetArea from '../actions/useGetArea';

import markerImg from "../assets/marker.png"

const { kakao } = window;

var kakaoMap = {};
var guList = [];
var marker_old = [];

// const locationSeoulGu = [
//     {latlng: new kakao.maps.LatLng(37.59491732, 126.9773213), name: "종로구"},
//     {latlng: new kakao.maps.LatLng(37.56014356, 126.9959681), name: "중구"},
//     {latlng: new kakao.maps.LatLng(37.53138497, 126.979907), name: "용산구"},
//     {latlng: new kakao.maps.LatLng(37.55102969, 127.0410585), name: "성동구"},
//     {latlng: new kakao.maps.LatLng(37.54670608, 127.0857435	), name: "광진구"},
//     {latlng: new kakao.maps.LatLng(37.58195655, 127.0548481), name: "동대문구"},
//     {latlng: new kakao.maps.LatLng(37.59780259, 127.0928803), name: "중랑구"},
//     {latlng: new kakao.maps.LatLng(37.6057019, 127.0175795), name: "성북구"},
//     {latlng: new kakao.maps.LatLng(37.64347391, 127.011189), name: "강북구"},
//     {latlng: new kakao.maps.LatLng(37.66910208, 127.0323688), name: "도봉구"},
//     {latlng: new kakao.maps.LatLng(37.65251105, 127.0750347), name: "노원구"},
//     {latlng: new kakao.maps.LatLng(37.61921128, 126.9270229), name: "은평구"},
//     {latlng: new kakao.maps.LatLng(37.57778531, 126.9390631), name: "서대문구"},
//     {latlng: new kakao.maps.LatLng(37.55931349, 126.90827), name: "마포구"},
//     {latlng: new kakao.maps.LatLng(37.52478941, 126.8554777), name: "양천구"},
//     {latlng: new kakao.maps.LatLng(37.56123543, 126.822807), name: "강서구"},
//     {latlng: new kakao.maps.LatLng(37.49440543, 126.8563006), name: "구로구"},
//     {latlng: new kakao.maps.LatLng(37.46056756, 126.9008202), name: "금천구"},
//     {latlng: new kakao.maps.LatLng(37.52230829, 126.9101695), name: "영등포구"},
//     {latlng: new kakao.maps.LatLng(37.49887688, 126.9516415), name: "동작구"},
//     {latlng: new kakao.maps.LatLng(37.46737569, 126.9453372), name: "관악구"},
//     {latlng: new kakao.maps.LatLng(37.47329547, 127.0312203), name: "서초구"},
//     {latlng: new kakao.maps.LatLng(37.49664389, 127.0629852), name: "강남구"},
//     {latlng: new kakao.maps.LatLng(37.50561924, 127.115295), name: "송파구"},
//     {latlng: new kakao.maps.LatLng(37.55045024, 127.1470118), name: "강동구"},
//  ];

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
            console.log(value);

            // // 커스텀 오버레이를 위함.
            // // const content = {}
            // var customOverlay = new kakao.maps.CustomOverlay({
            //     map: null,
            //     position: position,
            //     content: content,
            //     yAnchor: 1.85,
            //     xAnchor : 0.45,
            // });
            
            var imageSrc = markerImg;
            var imageSize = new kakao.maps.Size(60, 60);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            
            var marker = new kakao.maps.Marker({
                map: kakaoMap, // 마커를 표시할 지도
                position: new kakao.maps.LatLng(value.lat, value.lng), // 마커를 표시할 위치
                title: value.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });

            marker_new.push(marker);
            kakao.maps.event.addListener(marker, 'click', moveAndDisplayGuArea(marker, value.lat, value.lng, value.name));

            // // #2.3 줌인 & 마커 위치로 지도 이동
            function moveAndDisplayGuArea(customOverlay, lat, lng, guName) {
                return function() {
                    // var moveLatLon = loca;
                    map.setLevel(7); 
                    map.panTo(new kakao.maps.LatLng(lat, lng));
                    getArea(guName);
                }
            }
        })
        dispatch(actionCreators.addGuMarker(marker_new));
        console.log(marker_new);
        
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