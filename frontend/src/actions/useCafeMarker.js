import { useDispatch, useSelector } from "react-redux";
import actionCreators from "./actionCreators";
const {kakao} = window;


const useCafeMarker = () =>{
    const { map, cafeMarker} = useSelector(state => ({
        map: state.setMap.eodiyaMap.map,
        cafeList: state.setMap.eodiyaMap.cafeList,
        cafeMarker: state.setMap.eodiyaMap.cafeMarker,
    }))
    
    const dispatch = useDispatch();
    
    var markerList = [];

    const setCafeMarker = (list) => {
        const kakaoMap = map;
        
        cafeMarker.map(value => {
            value.setMap(null);
        })
        
        list.map(value => {
            var markerPosition = new kakao.maps.LatLng(value.cafePoint[1], value.cafePoint[0]);
            var marker = new kakao.maps.Marker({
                position:  markerPosition
            });
            //contents는 HTML 문자열이나 document element 가능
            var contents = ` 
                    <style>
                        .wrap {position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
                        .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
                        .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
                        .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
                        .info .body {position: relative;overflow: hidden;}
                        .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
                        .desc .ellipsis {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
                        .desc .jibun {font-size: 11px;color: #888;margin-top: -2px;}
                        .body .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
                        .body .link {color: #5085BB;}
                    </style>
                    <div class="wrap" style="background: #fff">
                        <div class = "info">
                            <div class="title"> 
                            ${value.cafeName}
                            </div>
                        <div>
                        <div class="body">
                            <div class="img">
                                <img src=${value.cafePhoto} width="73" height ="70">
                            </div>
                            <div class="desc">
                                <div class="addr">${value.cafeAddress}</div>
                                <div class="jibun">카페 평점 :${value.cafeRate}</div>
                                <div class="addr">리뷰 개수:${value.reviewCount}</div>
                                <div class="link">홈페이지 : ${value.cafeHomepage}</div>
                            </div>
                        </div>
                    </div>

                    `;
            var infowindow = new kakao.maps.CustomOverlay({
                position : markerPosition,
                content: contents // 인포윈도우에 표시할 내용
            });
            (function(marker, infowindow){
                kakao.maps.event.addListener(marker, 'mouseover', function(){
                    infowindow.setMap(map);
                })
                kakao.maps.event.addListener(marker, 'mouseout', function(){
                    infowindow.setMap(null);
                })
            })(marker, infowindow);
            marker.setMap(kakaoMap);
            markerList.push(marker);
        })

        dispatch(actionCreators.setCafeMarker(markerList));
    }
    return {setCafeMarker};

                
}

export default useCafeMarker;