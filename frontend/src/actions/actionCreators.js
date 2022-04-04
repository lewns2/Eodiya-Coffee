// action type
const SET_MAP = "setMap";
const SET_GUAREA = "setGuArea";
const SET_DONGAREA = "setDongArea";
const SET_GUMARKER = "setGumarker";
const SET_DONGMARKER = "setDongmarker";
const SET_MAPLEVEL = "setMaplevel";


// action method
const setMap = (map) => {
    return {
        type : SET_MAP,
        map : map,
    }
};

const addGuArea = (data, gu) => {
    return {
        type : SET_GUAREA,
        guArea : data,
        gu : gu,
    }
}

const addDongArea = (data, dong) => {
    return {
        type : SET_DONGAREA,
        dongArea : data,
        dong : dong,
    }
}

const addGuMarker = (data) => {
    return {
        type : SET_GUMARKER,
        guMarker : data,
    }
}

const addDongMarker = (data) => {
    return {
        type : SET_DONGMARKER,
        dongMarker : data,
    }
}

const setMaplevel = (data) => {
    return {
        type : SET_MAPLEVEL,
        mapLevel : data,
    }
}

export const actionCreators = {
    setMap,
    addGuArea,
    addDongArea,
    addGuMarker,
    addDongMarker,
    setMaplevel,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;