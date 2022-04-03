import actionCreators from "../actions/actionCreators";

const { SET_GUMARKER } = actionCreators.addGuMarker;
const { SET_DONGMARKER } = actionCreators.addDongMarker;

const getArea = (state = [], action) => {
    switch (action.type) {
        
        case SET_GUMARKER:
            console.log("reducer... 구 마커 설정 : ", action);
            return {
            }

        case SET_DONGMARKER:
            return {

            }
        default:
            return state;
    }
}

export default getArea;
