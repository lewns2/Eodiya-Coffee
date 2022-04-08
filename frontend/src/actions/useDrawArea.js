import { useSelector, useDispatch} from "react-redux";
import actionCreators from "./actionCreators";
import useSetDongMarker from "./useSetDongMarker";

const {kakao} = window;

var kakaoMap = {};
var area = [];
var markers = [];
var donginfo = [];
var guPoly = [];

export const useDrawArea = () => {

    const { map, guArea, guMarker, dongArea } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        guArea : state.setMap.eodiyaMap.guArea,
        guMarker : state.setMap.eodiyaMap.guMarker, 
        dongArea : state.setMap.eodiyaMap.dongArea, 
    }))

    const dispatch = useDispatch();
    const {setDongMarker} = useSetDongMarker();


    kakaoMap = map;
    area = guArea;
    markers = guMarker;
    donginfo = dongArea;

    const drawArea = () => {
        
        let path = [];
        let points = [];

        for(var i=0; i<area[0].guXYPoint.length; i++) {
            let point = {};
            point.x = area[0].guXYPoint[i][1];
            point.y = area[0].guXYPoint[i][0];
            points.push(point);
            path.push(new kakao.maps.LatLng(point.x, point.y));
        }

        let polygon = new kakao.maps.Polygon({
            map : kakaoMap,
            path: path,
            strokeWeight: 2, // 선의 두께입니다
            strokeColor: 'black', // 선의 색깔입니다
            strokeOpacity: 0.5, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'longdash', // 선의 스타일입니다
            fillColor: '#fff', // 채우기 색깔입니다
            fillOpacity: 0.4, // 채우기 불투명도 입니다
        });

        guPoly.push(polygon);

        var guname = area[0].guName;

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

        // # 2.6 다각형 클릭 시, 줌인 & 동 구역 그리기
        kakao.maps.event.addListener(polygon, 'click', function() {
            kakaoMap.setLevel(6);
            for(var i=0; i<markers.length; i++) {
                markers[i].setMap(null);
            }
            polygon.setMap(null);
            setDongMarker(polygon, guname);
        });
        dispatch(actionCreators.setGuPoly(guPoly));

    }

    return {drawArea};

    
}

export default useDrawArea;