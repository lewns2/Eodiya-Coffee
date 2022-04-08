import { useSelector, useDispatch } from "react-redux";
import actionCreators from "./actionCreators";
const { kakao } = window;

var kakaoMap = {};
var commAreaList = [];

const useDrawCommArea = () => {

    const { map, commArea } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        commArea : state.setMap.eodiyaMap.commArea,
    }))

    kakaoMap = map;
    commAreaList = commArea;
    const dispatch = useDispatch();

    const drawCommArea = () => {
        let polygons = [];
        
        commAreaList.map(value => {
            let state = value.grade;
            let commName = value.commercialAreaName;

            let path = [];
            let points = [];

            

            for(var i=0; i<value.commercialAreaXYPoint.length; i++) {
                let point = {};
                point.x = value.commercialAreaXYPoint[i][1];
                point.y = value.commercialAreaXYPoint[i][0];
                points.push(point);
                path.push(new kakao.maps.LatLng(point.x, point.y));
            }

            var stateColor = '';
            var polygon;
            switch(state) {
                case "Good":
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: 'green', // 선의 색깔입니다
                        fillColor: 'green', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = 'green';
                    break;
                case "Normal":
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: 'orange', // 선의 색깔입니다
                        fillColor: 'orange', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = 'orange';
                    break;
                case "Bad":
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: 'red', // 선의 색깔입니다
                        fillColor: 'red', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = 'red';
                    break;
                default:
                    return;
                
            }

            polygons.push(polygon);
            // #2.5.1 영역에 효과 추가하기
            const content = `<div class ="label">` +
                            `<span class="left"></span><span class="center">${commName}</span>` +
                            `<span class="right"></span>` +
                         `</div>`;

            const customOverlay = new kakao.maps.CustomOverlay({
                content : content,
            });
                                
            kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                polygon.setOptions({ fillColor: '#fff' });
                        
                customOverlay.setPosition(new kakao.maps.LatLng(value.centerYPoint, value.centerXPoint));
                customOverlay.setMap(kakaoMap);
            });

            kakao.maps.event.addListener(polygon, 'mouseout', function () {
                polygon.setOptions({ fillColor: stateColor });
                customOverlay.setMap(null);
            });

            // # 2.6 다각형 클릭 시, 줌인
            kakao.maps.event.addListener(polygon, 'click', function() {
            });
        })
        dispatch(actionCreators.addSanggwonAreaData(polygons));
        
    }
    return {drawCommArea}; 
}

export default useDrawCommArea;