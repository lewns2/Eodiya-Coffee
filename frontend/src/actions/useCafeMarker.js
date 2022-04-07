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
    const markerDraw = () =>{

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
            marker.setMap(kakaoMap);
            markerList.push(marker);
        })

        dispatch(actionCreators.setCafeMarker(markerList));
    }
    return {markerDraw};
}

export default useCafeMarker;