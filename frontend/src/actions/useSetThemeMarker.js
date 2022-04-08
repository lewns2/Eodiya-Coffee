import { useSelector, useDispatch } from "react-redux";
import actionCreators from "./actionCreators";

const { kakao } = window;

var kakaoMap = {};
var old_Area = [];

const theme =["술카페", "커피전문점", "무인카페", "브런치카페", "키즈카페", "스터디카페", "보드게임카페", "디저트카페"];

const useSetThemeMarker = () => {

    const { map, themeArea } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        themeArea : state.setMap.eodiyaMap.themeArea,
    }))

    const dispatch = useDispatch();


    kakaoMap = map;
    old_Area = themeArea;

    const setThemeMarker = (data, category) => {
        old_Area.map(value => {
            value.setMap(null);
        })

        let polygons = [];
        let rank = 1;
        data.map(value => {
            let state = rank;
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
                        strokeColor: '#2985EB', // 선의 색깔입니다
                        fillColor: '#2985EB', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = '#2985EB';
                    break;
                case 2:
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: '#13B292', // 선의 색깔입니다
                        fillColor: '#13B292', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = '#13B292';
                    break;
                case 3:
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: '#99BF15', // 선의 색깔입니다
                        fillColor: '#99BF15', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = '#99BF15';
                    break;
                default:
                    polygon = new kakao.maps.Polygon({
                        map : kakaoMap,
                        path: path,
                        strokeStyle: 'solid', // 선의 스타일 입니다
                        strokeColor: '#F3CE00', // 선의 색깔입니다
                        fillColor: '#F3CE00', // 채우기 색깔입니다
                        fillOpacity : 0.3,
                        zIndex : 9999999,
                    });
                    stateColor = '#F3CE00';
                    break;
            }
            
            var content;
            switch (theme[category]) {
                case "스터디카페":
                    content = `
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
                                        (${rank-1}위) ${value.commercialAreaName}
                                        </div>
                                    <div>
                                    <div>
                                        <div class="addr">주변 정보</div>
                                        <div class="addr">10대, 20대 생활인구 수 : ${value.sum1020} 명</div>
                                        <div class="addr">상권 주변 중학교 : ${value.schoolNumber2} 개</div>
                                        <div class="addr">상권 주변 고등학교 : ${value.schoolNumber3} 개</div>
                                        <div class="addr">상권 주변 대학교 : ${value.universityNumber} 개</div>
                                        <div class="addr">상권 주변 집객시설 중 중,고등,대학교 총 합 : 총 ${value.sumSchools} 개</div>
                                    </div>
                                </div>`
                    break;
                    case "디저트카페":
                        content = `
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
                                            (${rank-1}위) ${value.commercialAreaName}
                                            </div>
                                        <div>
                                        <div>
                                            <div class="addr">주변 정보</div>
                                            <div class="addr">상권 내 아파트 평균 시세 : 평균 ${value.apartmentAvgPrice} 원</div>
                                            <div class="addr">20대, 30대 여성 생활 인구 : ${value.life_people_female_sum2030} 명</div>
                                            <div class="addr">대학교 수 : 총 ${value.universityCount} 개</div>
                                            <div class="addr">극장 수 : 총 ${value.theaterCount} 개</div>
                                        </div>
                                    </div>`
                        break;
                        case "술카페":
                            content = `
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
                                                (${rank-1}위) ${value.commercialAreaName}
                                                </div>
                                            <div>
                                            <div>
                                                <div class="addr">주변 정보</div>
                                                <div class="addr">20대 생활 인구, 30대 생활 인구 : ${value.lifePeople_20} 명, ${value.lifePeople_30} 명</div>
                                                <div class="addr">10대, 20대 생활인구수의 합 : 총 ${value.peopleTotal} 명</div>
                                                <div class="addr">분기 매출 : 총 ${value.quarterRevenue} 원</div>
                                                <div class="addr">17-21시 매출 : ${value.revenue_1721} 원</div>
                                                <div class="addr">21-24시 매출 : 총 ${value.revenue_2124} 원</div>
                                                <div class="addr">저녁 총매출(17-24시) : ${value.revenue_in_night} 원</div>
                                            </div>
                                        </div>`
                            break;
                            case "커피전문점":
                                content = `
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
                                                    (${rank-1}위) ${value.commercialAreaName}
                                                    </div>
                                                <div>
                                                <div>
                                                    <div class="addr">주변 정보</div>
                                                    <div class="addr">20대 생활 인구, 30대 생활 인구 : ${value.lifePeople_20} 명, ${value.lifePeople_30} 명</div>
                                                    <div class="addr">10대, 20대 생활인구수의 합 : 총 ${value.peopleTotal} 명</div>
                                                    <div class="addr">분기 매출 : 총 ${value.quarterRevenue} 원</div>
                                                    <div class="addr">17-21시 매출 : ${value.revenue_1721} 원</div>
                                                    <div class="addr">21-24시 매출 : 총 ${value.revenue_2124} 원</div>
                                                    <div class="addr">저녁 총매출(17-24시) : ${value.revenue_in_night} 원</div>
                                                </div>
                                            </div>`
                                break;
                                case "무인카페":
                                    content = `
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
                                                        (${rank-1}위) ${value.commercialAreaName}
                                                        </div>
                                                    <div>
                                                    <div>
                                                        <div class="addr">주변 정보</div>
                                                        <div class="addr">상권 주변 회사원 수 : ${value.salarymanNumber} 명 </div>
                                                        <div class="addr">상권 주변 지하철역 수 : ${value.subwayNumber} 개</div>
                                                        <div class="addr">상권 주변 기차역 수 : ${value.trainstationNumber} 개</div>
                                                        <div class="addr">상권 주변 교통수단 수 : ${value.transportationNumber} 개</div>
                                                    </div>
                                                </div>`
                                    break;
                                    case "브런치카페":
                                        content = `
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
                                                            (${rank-1}위) ${value.commercialAreaName}
                                                            </div>
                                                        <div>
                                                        <div>
                                                            <div class="addr">주변 정보</div>
                                                            <div class="addr">11~14시 생활인구 : ${value.revenue1114} 명 </div>
                                                        </div>
                                                    </div>`
                                        break;
                                        case "키즈카페":
                                            content = `
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
                                                                (${rank-1}위) ${value.commercialAreaName}
                                                                </div>
                                                            <div>
                                                            <div>
                                                                <div class="addr">주변 정보</div>
                                                                <div class="addr">상권 주변의 유치원 수 : ${value.kindergardenNumber} 개 </div>
                                                                <div class="addr">30대 생활인구 : ${value.lifePeople_30} 명 </div>
                                                                <div class="addr">상권 주변의 초등학교 수 : ${value.schoolNumber} 개 </div>
                                                                <div class="addr">상권 주변 학교들의 수(초등학교 + 유치원) : ${value.schoolTotal} 개 </div>
                                                            </div>
                                                        </div>`
                                            break;
                                            case "보드게임카페":
                                                content = `
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
                                                                    (${rank-1}위) ${value.commercialAreaName}
                                                                    </div>
                                                                <div>
                                                                <div>
                                                                    <div class="addr">주변 정보</div>
                                                                    <div class="addr">10대 생활인구 : ${value.lifePeople_10} 개 </div>
                                                                    <div class="addr">20대 생활인구 : ${value.lifePeople_20} 명 </div>
                                                                    <div class="addr">생활인구수의 합(10대 + 20대) : ${value.peopleTotal} 개 </div>
                                                                    <div class="addr">상권 주변의 중학교 수 : ${value.schoolNumber2} 개 </div>
                                                                    <div class="addr">상권 주변의 고등학교 수 : ${value.schoolNumber3} 개 </div>
                                                                    <div class="addr">상권 주변 학교들의 수(중학교 + 고등학교 + 대학교) : ${value.schoolTotal} 개 </div>
                                                                    <div class="addr">상권 주변의 대학교 수 : ${value.universityNumber} 개 </div>
                                                                </div>
                                                            </div>`
                                                break;
                                    default:
                                        break;
            }

            polygons.push(polygon);
            // #2.5.1 영역에 효과 추가하기

            const customOverlay = new kakao.maps.CustomOverlay({
                content : content,
            });
                                
            kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
                polygon.setOptions({ fillColor: '#fff' });
                        
                customOverlay.setPosition(new kakao.maps.LatLng(value.commercialAreaCenterYPoint, value.commercialAreaCenterXPoint));
                customOverlay.setMap(kakaoMap);
            });

            kakao.maps.event.addListener(polygon, 'mouseout', function () {
                polygon.setOptions({ fillColor: stateColor });
                customOverlay.setMap(null);
            });
        })
        dispatch(actionCreators.addThemeArea(polygons));     
    };
    return {setThemeMarker}; 
}

export default useSetThemeMarker;