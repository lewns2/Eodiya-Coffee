import { useSelector, useDispatch } from "react-redux";

import actionCreators from "./actionCreators";

import markerImg from "../assets/marker.png"

const { kakao } = window;

var kakaoMap = {};
var dongList = [];
var marker_old = [];


const useSetDongMarker = () => {
    
    const { map, dongArea, dongMarker } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        dongMarker : state.setMap.eodiyaMap.dongMarker,
        dongArea : state.setMap.eodiyaMap.dongArea,
    }))

    const dispatch = useDispatch();

    kakaoMap = map;
    dongList = dongArea;
    marker_old = dongMarker;
    

    const setDongMarker = (polygon) => {

        polygon.setMap(null);

        var polygon_new = [];
        
        let polygons = [];

        console.log(dongList);

        dongList.map(value => {
            let dongName = value.dongName;
            let dongLng = value.dongCenterXPoint;
            let dongLat = value.dongCenterYPoint;
            let dongCode = value.dongCode;

            let path = [];
            let points = [];

            for(var i=0; i<value.dongXYPoint.length; i++) {
                let point = {};
                point.x = value.dongXYPoint[i][1];
                point.y = value.dongXYPoint[i][0];
                points.push(point);
                path.push(new kakao.maps.LatLng(point.x, point.y));
            }

            var polygon = new kakao.maps.Polygon({
                map : kakaoMap,
                path: path,
                strokeWeight: 2, // 선의 두께입니다
                strokeColor: 'black', // 선의 색깔입니다
                strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                strokeStyle: 'longdash', // 선의 스타일입니다
                fillColor: '#fff', // 채우기 색깔입니다
                fillOpacity: 0.3, // 채우기 불투명도 입니다
            });
            
            polygons.push(polygon);
            // #2.5.1 영역에 효과 추가하기
            const customOverlay = new kakao.maps.CustomOverlay({});
                                
            kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                polygon.setOptions({ fillColor: '#09f' });
                        
                customOverlay.setPosition(mouseEvent.latLng);
                customOverlay.setMap(kakaoMap);
            });

            kakao.maps.event.addListener(polygon, 'mouseout', function () {
                polygon.setOptions({ fillColor: '#fff' });
                customOverlay.setMap(null);
            });

            // # 2.6 다각형 클릭 시, 줌인
            kakao.maps.event.addListener(polygon, 'click', function() {
                kakaoMap.setLevel(5);
                map.panTo(new kakao.maps.LatLng(dongLat, dongLng));
                // polygon.setMap(null);           
            });
        })

        dispatch(actionCreators.addDongMarker(polygon_new));        
    };
    return {setDongMarker};
}
    
    // console.log(markers);

export default useSetDongMarker;

/*
import { useSelector, useDispatch } from "react-redux";

import actionCreators from "./actionCreators";

import markerImg from "../assets/marker.png"

const { kakao } = window;

var kakaoMap = {};
var dongList = [];
var marker_old = [];


const useSetDongMarker = () => {
    
    const { map, dongArea, dongMarker } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        dongMarker : state.setMap.eodiyaMap.dongMarker,
        dongArea : state.setMap.eodiyaMap.dongArea,
    }))
    const dispatch = useDispatch();

    kakaoMap = map;
    dongList = dongArea;
    marker_old = dongMarker;

    const setDongMarker = (polygon) => {
        
        // marker 초기화
        marker_old.map(value => {
            value.setMap(null);
        })

        var marker_new = [];

        dongList.map(value => {
            // console.log(value);

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
            var imageSize = new kakao.maps.Size(30, 30);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
            
            var latlng = new kakao.maps.LatLng(value.dongCenterYPoint, value.dongCenterXPoint)
            var marker = new kakao.maps.Marker({
                map: kakaoMap, // 마커를 표시할 지도
                position: latlng, // 마커를 표시할 위치
                title: value.dongName, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });

            marker_new.push(marker);
            kakao.maps.event.addListener(marker, 'click', moveAndDisplayDongArea(marker, latlng, value.dongName, value.dongXYPoint));

            // // #2.3 줌인 & 마커 위치로 지도 이동
            function moveAndDisplayDongArea(customOverlay, loca, dongName, dongXYPoint) {
                return function() {
                    var moveLatLon = loca;
                    kakaoMap.setLevel(5); 
                    kakaoMap.panTo(moveLatLon);
                    polygon.setMap(null);
    
                    let path = [];
                    let points = [];
    
                    for(var i=0; i<dongXYPoint.length; i++) {
                        let point = {};
                        point.x = dongXYPoint[i][1];
                        point.y = dongXYPoint[i][0];
                        points.push(point);
                        path.push(new kakao.maps.LatLng(point.x, point.y));
                    }
    
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeWeight: 2, // 선의 두께입니다
                        strokeColor: 'black', // 선의 색깔입니다
                        strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                        strokeStyle: 'longdash', // 선의 스타일입니다
                        fillColor: '#fff', // 채우기 색깔입니다
                        fillOpacity: 0.3, // 채우기 불투명도 입니다
                    });
    
                    // #2.5.1 영역에 효과 추가하기
                    const customOverlay = new kakao.maps.CustomOverlay({});
                    
                    kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                        polygon.setOptions({ fillColor: '#09f' });
                        
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(kakaoMap);
                    });
    
                    kakao.maps.event.addListener(polygon, 'mouseout', function () {
                        polygon.setOptions({ fillColor: '#fff' });
                        customOverlay.setMap(null);
                    });
    
                    // getArea(dongName);
                }
            }
        })
        dispatch(actionCreators.addDongMarker(marker_new));
        console.log(marker_new);
        
        };
        return {setDongMarker};
}
    
    // console.log(markers);

export default useSetDongMarker;
*/