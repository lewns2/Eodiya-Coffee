import markerImg from "../assets/marker.png"

const {kakao} = window;

// 동 마커 그리기 && 동 구역 들고 있음.
const setDongMarker = (kakaoMap, dongInfo, polygon) => {

    console.log(dongInfo);
    var marker_new = [];
    var imageSrc = markerImg; 
        
    var imageSize = new kakao.maps.Size(30, 30);;
    
    for(var i=0; i<dongInfo.length; i++) {
            // var imageSize = new kakao.maps.Size(60, 60); 
        
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var latlng = new kakao.maps.LatLng(dongInfo[i].dongCenterYPoint, dongInfo[i].dongCenterXPoint)
            var marker = new kakao.maps.Marker({
                position: latlng,
                title : dongInfo[i].dongName,
                image : markerImage,
                opacity : 0.8,  // 투명도
            });
            
            // 마커를 따로 넣어주자.
            marker.setMap(kakaoMap);
            // markers.push(marker);

            // #2.1 마커 커스텀하기 => 정확히는 그냥 오버레이 덮어씌우기
            var content = dongInfo[i].name;

            var position = new kakao.maps.LatLng(dongInfo[i].dongCenterYPoint, dongInfo[i].dongCenterXPoint);

            var customOverlay = new kakao.maps.CustomOverlay({
                map: kakaoMap,
                clickable: true,
                position: position,
                content: content,
                yAnchor: 1.85,
                xAnchor : 0.45,
            });
            

            // #2.2 개별 마커 클릭 이벤트
            kakao.maps.event.addListener(marker, 'click', moveAndDisplayDongArea(marker, latlng, dongInfo[i].dongName, dongInfo[i].dongXYPoint));
    }

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

}

export default setDongMarker;