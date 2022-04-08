// import actionCreators from "../actions/actionCreators";

// const { kakao } = window;
  
// const { SET_MAP } = actionCreators.setMap;
// const { SET_GUMARKER } = actionCreators.addGuMarker;
// const { SET_DONGMARKER } = actionCreators.addGuMarker;

const {kakao} = window;

const locationSeoulGu = [
    {lat :37.59491732, lng : 126.9773213, name: "종로구"},
    {lat :37.56014356, lng : 126.9959681, name: "중구"},
    {lat :37.53138497, lng : 126.979907, name: "용산구"},
    {lat :37.55102969, lng : 127.0410585, name: "성동구"},
    {lat :37.54670608, lng : 127.0857435, name: "광진구"},
    {lat :37.58195655, lng : 127.0548481, name: "동대문구"},
    { lat :37.59780259, lng : 127.0928803, name: "중랑구"},
    { lat :37.6057019, lng : 127.0175795, name: "성북구"},
    { lat :37.64347391, lng : 127.011189, name: "강북구"},
    { lat :37.66910208, lng : 127.0323688, name: "도봉구"},
    { lat :37.65251105, lng : 127.0750347, name: "노원구"},
    { lat :37.61921128, lng : 126.9270229, name: "은평구"},
    { lat :37.57778531, lng : 126.9390631, name: "서대문구"},
    { lat :37.55931349, lng : 126.90827, name: "마포구"},
    { lat :37.52478941, lng : 126.8554777, name: "양천구"},
    { lat :37.56123543, lng : 126.822807, name: "강서구"},
    { lat :37.49440543, lng : 126.8563006, name: "구로구"},
    { lat :37.46056756, lng : 126.9008202, name: "금천구"},
    { lat :37.52230829, lng : 126.9101695, name: "영등포구"},
    { lat :37.49887688, lng : 126.9516415, name: "동작구"},
    { lat :37.46737569, lng : 126.9453372, name: "관악구"},
    { lat :37.47329547, lng : 127.0312203, name: "서초구"},
    { lat :37.49664389, lng : 127.0629852, name: "강남구"},
    { lat :37.50561924, lng : 127.115295, name: "송파구"},
    { lat :37.55045024, lng : 127.1470118, name: "강동구"},
];


const setMap = (state = {
    eodiyaMap : {
        map : null,
        guArray : locationSeoulGu,
        guMarker : [],
        guOverlay : [],
        guPoly : [],
        dongMarker : [],
        guArea : [],
        dongArea : [],
        mapLevel : 8,
        overlay: [],
        guNum:123,
        dongNum:123,
        rightSideBarMode:1,
        isRightOpen:false,
        searchedDongData:{
            quarterRevenue: 0,
            perRevenue: 0,
            ageGroup: 0,
            timeGroup: 0,
            numberStore: 0,
            openingStore: 0,
            closureStore: 0,
            openingRate: 0,
            closureRate: 0,
            likePeople: 0,
            maleLikePeople: 0,
            femaleLikePeople: 0,
            likePeople: 0,
            likePeopleAge10: 0,
            likePeopleAge20: 0,
            likePeopleAge30: 0,
            likePeopleAge40: 0,
            likePeopleAge50: 0,
            likePeopleAge60: 0
        },
        themeGuData: [],
        themeNum:0,
        leftDong : [],
        commArea : [],
        cafeList : [],
        cafeMarker :[],
        isLoading :false,
        themeArea : [],
        themeAreaData : [],
        sanggwonAreaData : [],
    }
}, action) => {
    switch (action.type) {
        case "setMap":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    map: action.map
                }
            }
        case "setGuArea":
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
        case "setGuOverlay":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    guOverlay: action.guOverlay,
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

        case "setGuNum":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    guNum: action.guNum,
                }
            }
        case "setDongNum":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    dongNum: action.dongNum,
                }
            }
        case "setRightSideBarMode":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    rightSideBarMode: action.rightSideBarMode,
                }
            }
        case "setIsRightOpen":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    isRightOpen: action.isRightOpen,
                }
            }
        case "setSearchedDongData":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    searchedDongData: action.searchedDongData,
                }
            }
        case "setLeftDong":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    leftDong: action.leftDong,
                }
            }
        case "setCommArea":
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    commArea: action.commArea,
                }
            }

        case "setCafeList":
            return {
                ...state,
                eodiyaMap :{
                    ...state.eodiyaMap,
                    cafeList: action.cafeList,
                }
            }
        case "setIsLoading":
        return {
            ...state,
            eodiyaMap :{
                ...state.eodiyaMap,
                isLoading: action.isLoading,
            }
        }
        case "setCafeMarker":
            return{
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    cafeMarker : action.cafeMarker,
                }
            }
        case "setGuPoly":
            return {
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    guPoly : action.guPoly,
                }
            }
        case "setThemeGuData":
            return{
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    themeGuData : action.themeGuData,
                }
            }
        case "setThemeNum":
            return{
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    themeNum : action.themeNum,
                }
            }
        case "themeArea":
            return {
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    themeArea : action.themeArea,
                }
            }
        case "addThemeArea":
            return {
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    themeAreaData : action.themeAreaData,
                }
            }
        case "addSanggwonAreaData":
            return {
                ...state,
                eodiyaMap:{
                    ...state.eodiyaMap,
                    sanggwonAreaData : action.sanggwonAreaData,
                }
            }
        default:
            return state;
    };
    
}

export default setMap;