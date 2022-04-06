import { useSelector } from "react-redux";

const { kakao } = window;

var kakaoMap = {};
var commAreaList = [];

const useSetThemeMarker = () => {

    const { map } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map
    }))

    kakaoMap = map;

    const setThemeMarker = (data) => {
        console.log(data, "여기는 되나?");
        
        let polygons = [];
        let rank = 1;
        data.map(value => {
            let state = rank;
            let commName = value.commercialAreaName;
            console.log("테슽으", commName, state);
            rank++;
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
                case 1:
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
                case 2:
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
                case 3:
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: 'blue', // 선의 색깔입니다
                        fillColor: 'blue', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = 'blue';
                    break;
                default:
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
                        
                customOverlay.setPosition(new kakao.maps.LatLng(value.commercialCenterYPoint, value.commercialCenterXPoint));
                customOverlay.setMap(kakaoMap);
            });

            kakao.maps.event.addListener(polygon, 'mouseout', function () {
                polygon.setOptions({ fillColor: stateColor });
                customOverlay.setMap(null);
            });
        })
    }
    return {setThemeMarker}; 
}

export default useSetThemeMarker;