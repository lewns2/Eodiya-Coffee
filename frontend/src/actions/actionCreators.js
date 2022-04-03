// action type
const SET_MAP = "setMap";
const SET_GUMARKER = "setGumarker";
const SET_DONGMARKER = "setDongmarker";


// action method
const setMap = (map) => {
    return {
        type : SET_MAP,
        map : map,
    }
};

const addGuMarker = (gu) => {
    return {
        type : SET_GUMARKER,
        gu : gu,
    }
}

const addDongMarker = (dong) => {
    return {
        type : SET_DONGMARKER,
        dong : dong,
    }
}


export const actionCreators = {
    setMap,
    addGuMarker,
    addDongMarker,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;