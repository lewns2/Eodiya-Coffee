import { useSelector, useDispatch } from "react-redux";
import actionCreators from "./actionCreators";

const { kakao } = window;

var kakaoMap = {};
var dongList = [];
var marker_old = [];
// function goToDetail() {};

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
    

    const setDongMarker = (polygon, guName) => {

        polygon.setMap(null);
        let polygons = [];

        // console.log("동 정보를 달라 ", dongList);

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
            const content = `<div class ="label">` +
                            `<span class="left"></span><span class="center">${dongName}</span>` +
                            `<span class="right"></span>` +
                         `</div>`;

            const customOverlay = new kakao.maps.CustomOverlay({
                content : content,
            });
                                
            kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                polygon.setOptions({ fillColor: '#09f' });
                        
                customOverlay.setPosition(new kakao.maps.LatLng(dongLat + 0.0010, dongLng));
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
            });
        })
        dispatch(actionCreators.addDongMarker(polygons));        
    };
    return {setDongMarker};
}

export default useSetDongMarker;