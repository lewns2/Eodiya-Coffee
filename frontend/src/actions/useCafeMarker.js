import { useSelector, useDispatch } from "react-redux";
import actionCreators from "./actionCreators";

const {kakao} = window;


const useCafeMarker = () =>{
    const dispatch = useDispatch();
    const { map, cafeList, cafeMarker} = useSelector(state => ({
        map: state.setMap.eodiyaMap.map,
        cafeList: state.setMap.eodiyaMap.cafeList,
        cafeMarker: state.setMap.eodiyaMap.cafeMarker,
    }))
    const list = cafeList;
    const kakaoMap = map;
    const marker = cafeMarker;

    cafeMarker.map(value =>{
        value.setMap(null);
    })
    var markerList =[];
    list.map(value => {
        // console.log(value);
        var markerPosition = new kakao.maps.LatLng(value.cafePoint[1], value.cafePoint[0]);
        var marker = new kakao.maps.Marker({
            position:  markerPosition
        });
        kakao.maps.event.addListener(marker, 'click', customOverlay(markerPosition,value));
        marker.setMap(kakaoMap);
        markerList.push(marker);
    })
    function customOverlay(markerPosition, value) {
        return function() {
            var pos = markerPosition;
            var content = 
                `<div class="wrap" style="background: #fff">
                    <div class = "info">
                        <div class="title"> 
                            ${value.cafeName}
                            <div class="close" onclick="closeOverlay()" title="닫기"></div>
                        </div>
                        <div class="body">
                            <div class="img">
                                <img src=${value.cafePhoto} width="73" height ="70">
                            </div>
                            <div class="desc">
                                <div class="addr">${value.cafeAddress}</div>
                                <div class="addr">${value.Homepage}</div>
                            </div>
                    </div>
                </div>`;
            var overlay = new kakao.maps.CustomOverlay({
                position: pos,
                content: content
            })
            overlay.setMap(kakaoMap);

        }
    }
    dispatch(actionCreators.addCafeMarker(markerList));

}

export default useCafeMarker;