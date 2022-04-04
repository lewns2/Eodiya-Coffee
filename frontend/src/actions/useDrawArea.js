import { useDispatch, useSelector } from "react-redux";


const {kakao} = window;


export const useDrawArea = () => {

    const map = useSelector(state => state.setMap.map);
    const guMarker = useSelector(state => state.setMap.guMarker);

    console.log("마커 가져와야지 : ", guMarker);

    const drawArea = () => {

        if(guMarker == null) {
            console.log("마커가 없어요");
        }
        else {
        let path = [];
        let points = [];
        let polygons = [];

        for(var i=0; i<guMarker[0].guXYPoint.length; i++) {
            let point = {};
            point.x = guMarker[0].guXYPoint[i][1];
            point.y = guMarker[0].guXYPoint[i][0];
            points.push(point);
            path.push(new kakao.maps.LatLng(point.x, point.y));
        }

        let polygon = new kakao.maps.Polygon({
            map : map,
            path: path,
            strokeWeight: 2, // 선의 두께입니다
            strokeColor: '#004c80', // 선의 색깔입니다
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
            customOverlay.setMap(map);
        });

        kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
        });
        }
    }

    return {drawArea};

    
}

export default useDrawArea;