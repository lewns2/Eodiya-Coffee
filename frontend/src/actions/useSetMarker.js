import { useSelector, useDispatch } from "react-redux";

import actionCreators from "./actionCreators";
import useGetArea from '../actions/useGetArea';

import markerImg from "../assets/marker.png"

const { kakao } = window;

var kakaoMap = {};
var guList = [];
var marker_old = [];
var guOverlay = [];
var old_guPoly = []
var old_dongPoly = [];

const useSetMarker = () => {
    
    const { map, guArray, guMarker,dongMarker, guPoly } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        guArray : state.setMap.eodiyaMap.guArray,
        guMarker : state.setMap.eodiyaMap.guMarker,
        dongMarker : state.setMap.eodiyaMap.dongMarker,
        guPoly : state.setMap.eodiyaMap.guPoly,
    }))
    const dispatch = useDispatch();
    const { getArea } = useGetArea();

    kakaoMap = map;
    guList = guArray;
    marker_old = guMarker;
    old_dongPoly = dongMarker;
    old_guPoly = guPoly;

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
                    old_dongPoly.map(value => {
                        value.setMap(null);
                    })
                    old_guPoly.map(value => {
                        value.setMap(null);
                    })
                    map.setLevel(7); 
                    map.panTo(new kakao.maps.LatLng(lat, lng));
                    getArea(guName);
                }
            }
        })
        dispatch(actionCreators.addGuMarker(marker_new));
        dispatch(actionCreators.setGuOverlay(guOverlay));
        
        };
        return {setMarker};
}

export default useSetMarker;