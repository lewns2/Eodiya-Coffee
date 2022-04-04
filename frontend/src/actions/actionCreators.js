// action type
const SET_MAP = "setMap";
const SET_GUMARKER = "setGumarker";
const SET_DONGMARKER = "setDongmarker";
const SET_GUNUM = "setGuNum";
const SET_DONGNUM = "setDongNum";
const SET_RIGHTSIDEBARMODE = "setRightSideBarMode";


// action method
const setMap = (map) => {
    return {
        type : SET_MAP,
        map : map,
    }
};

const addGuMarker = (data, gu) => {
    return {
        type : SET_GUMARKER,
        guMarker : data,
        gu : gu,
    }
}

const addDongMarker = (data, dong) => {
    return {
        type : SET_DONGMARKER,
        dongMarker : data,
        dong : dong,
    }
}

const setGuNum = (gu) => {
    return {
        type : SET_GUNUM,
        guNum : gu,
    }
}

const setDongNum = (dong) => {
    return {
        type : SET_DONGNUM,
        dongNum : dong,
    }
}

const setRightSideBarMode = (mode) => {
    return {
        type : SET_RIGHTSIDEBARMODE,
        rightSideBarMode : mode,
    }
}

export const actionCreators = {
    setMap,
    addGuMarker,
    addDongMarker,
    setGuNum,
    setDongNum,
    setRightSideBarMode,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;