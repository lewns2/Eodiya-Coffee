import { useSelector } from "react-redux";

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

    const drawCommArea = () => {
        console.log(commAreaList);
        var polygon_new = [];
        
        let polygons = [];
        
        commAreaList.map(value => {
            let state = value.grade;
            let commName = value.commercialAreaName;
            let commCode = value.commercialAreaCode;

            let path = [];
            let points = [];

            for(var i=0; i<value.commercialAreaXYPoint.length; i++) {
                let point = {};
                point.x = value.commercialAreaXYPoint[i][1];
                point.y = value.commercialAreaXYPoint[i][0];
                points.push(point);
                path.push(new kakao.maps.LatLng(point.x, point.y));
            }
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
                    break;
                default:
                    return;
            }

            polygons.push(polygon);


        })
    }
    return {drawCommArea}; 
}

export default useDrawCommArea;