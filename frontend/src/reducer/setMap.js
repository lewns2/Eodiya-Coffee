import actionCreators from "../actions/actionCreators";

const { kakao } = window;
  
const { SET_MAP } = actionCreators.setMap;


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
        overlay: []
    }
}, action) => {
    switch (action.type) {
        case SET_MAP:
            console.log("setting...", action);
            return {
                ...state,
                eodiyaMap : {
                    ...state.eodiyaMap,
                    map: action.map
                }
            }
        
        default:
            return state;
    };
    
}

export default setMap;