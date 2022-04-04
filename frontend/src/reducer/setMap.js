// import actionCreators from "../actions/actionCreators";

// const { kakao } = window;
  
// const { SET_MAP } = actionCreators.setMap;
// const { SET_GUMARKER } = actionCreators.addGuMarker;
// const { SET_DONGMARKER } = actionCreators.addGuMarker;

const {kakao} = window;

// const locationSeoulGu = [
//     {latlng: new kakao.maps.LatLng(37.59491732, 126.9773213), name: "종로구"},
//     {latlng: new kakao.maps.LatLng(37.56014356, 126.9959681), name: "중구"},
//     {latlng: new kakao.maps.LatLng(37.53138497, 126.979907), name: "용산구"},
//     {latlng: new kakao.maps.LatLng(37.55102969, 127.0410585), name: "성동구"},
//     {latlng: new kakao.maps.LatLng(37.54670608, 127.0857435	), name: "광진구"},
//     {latlng: new kakao.maps.LatLng(37.58195655, 127.0548481), name: "동대문구"},
//     {latlng: new kakao.maps.LatLng(37.59780259, 127.0928803), name: "중랑구"},
//     {latlng: new kakao.maps.LatLng(37.6057019, 127.0175795), name: "성북구"},
//     {latlng: new kakao.maps.LatLng(37.64347391, 127.011189), name: "강북구"},
//     {latlng: new kakao.maps.LatLng(37.66910208, 127.0323688), name: "도봉구"},
//     {latlng: new kakao.maps.LatLng(37.65251105, 127.0750347), name: "노원구"},
//     {latlng: new kakao.maps.LatLng(37.61921128, 126.9270229), name: "은평구"},
//     {latlng: new kakao.maps.LatLng(37.57778531, 126.9390631), name: "서대문구"},
//     {latlng: new kakao.maps.LatLng(37.55931349, 126.90827), name: "마포구"},
//     {latlng: new kakao.maps.LatLng(37.52478941, 126.8554777), name: "양천구"},
//     {latlng: new kakao.maps.LatLng(37.56123543, 126.822807), name: "강서구"},
//     {latlng: new kakao.maps.LatLng(37.49440543, 126.8563006), name: "구로구"},
//     {latlng: new kakao.maps.LatLng(37.46056756, 126.9008202), name: "금천구"},
//     {latlng: new kakao.maps.LatLng(37.52230829, 126.9101695), name: "영등포구"},
//     {latlng: new kakao.maps.LatLng(37.49887688, 126.9516415), name: "동작구"},
//     {latlng: new kakao.maps.LatLng(37.46737569, 126.9453372), name: "관악구"},
//     {latlng: new kakao.maps.LatLng(37.47329547, 127.0312203), name: "서초구"},
//     {latlng: new kakao.maps.LatLng(37.49664389, 127.0629852), name: "강남구"},
//     {latlng: new kakao.maps.LatLng(37.50561924, 127.115295), name: "송파구"},
//     {latlng: new kakao.maps.LatLng(37.55045024, 127.1470118), name: "강동구"},
//   ];

const testLocation = [
    {lat : 37.59491732, lng : 126.9773213, name: "종로구"},
    {lat : 37.56014356, lng : 126.9959681, name: "중구"},
    {lat : 37.53138497, lng : 126.979907, name: "용산구"},
    {lat : 37.55102969, lng : 127.0410585, name: "성동구"},
    {lat : 37.54670608, lng : 127.0857435, name: "광진구"},
    {lat : 37.58195655, lng : 127.0548481, name: "동대문구"},
    {lat : 37.59780259, lng : 127.0928803, name: "중랑구"},
    {lat : 37.6057019,  lng : 127.0175795, name: "성북구"},
    {lat : 37.64347391, lng : 127.011189, name: "강북구"},
    {lat : 37.66910208, lng : 127.0323688, name: "도봉구"},
    {lat : 37.65251105, lng : 127.0750347, name: "은평구"},
    {lat : 37.61921128, lng : 126.9270229, name: "서대문구"},
    {lat : 37.57778531, lng : 126.9390631, name: "마포구"},
]

const setMap = (state = {
    eodiyaMap : {
        map : null,
        guArray : testLocation,
        guMarker : [],
        dongMarker : [],
        guArea : [],
        dongArea : [],
        mapLevel : 8,
        overlay: [],
    }
}, action) => {
    console.log("액션 타입 : ", action.type);
    switch (action.type) {
        case "setMap":
            console.log("setting...", action);
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    map: action.map
                }
            }
        case "setGuArea":
            // console.log("구 타입 확인 완료!@@@@@@@@@@@@@@@@@@@@@@")
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    guArea: action.guArea,
                }
            }
        case "setDongArea":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    dongArea: action.dongArea,
                }
            }
        case "setGumarker":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    guMarker: action.guMarker,
                }
            }
        
        case "setDongmarker":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    dongMarker: action.dongMarker,
                }
            }
        
        case "setMaplevel":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    mapLevel: action.mapLevel,
                }
            }
        
        default:
            return state;
    };
    
}

export default setMap;