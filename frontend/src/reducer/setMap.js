import actionCreators from "../actions/actionCreators";

const { kakao } = window;
  
const { SET_MAP } = actionCreators.setMap;
const { SET_GUMARKER } = actionCreators.addGuMarker;
const { SET_DONGMARKER } = actionCreators.addGuMarker;


const locationSeoulGu = [
    {lat : 37.59491732, lng : 126.9773213, name: "종로구"},
    {lat : 37.56014356, lng : 126.9959681, name: "중구"},
    {lat : 37.53138497, lng : 126.979907, name: "용산구"}
];

const setMap = (state = {
    eodiyaMap : {
        map : null,
        guList : locationSeoulGu,
        guMarker : [],
        dongMarker : [],
        overlay: [],
        guNum:123,
        dongNum:123,
        rightSideBarMode:1,
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
        case "setGumarker":
            // console.log("구 타입 확인 완료!@@@@@@@@@@@@@@@@@@@@@@")
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
        default:
            return state;
    };
    
}

export default setMap;