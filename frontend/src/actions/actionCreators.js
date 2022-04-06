// action type
const SET_MAP = "setMap";
const SET_GUAREA = "setGuArea";
const SET_DONGAREA = "setDongArea";
const SET_GUMARKER = "setGumarker";
const SET_DONGMARKER = "setDongmarker";
const SET_MAPLEVEL = "setMaplevel";
const SET_GUNUM = "setGuNum";
const SET_DONGNUM = "setDongNum";
const SET_RIGHTSIDEBARMODE = "setRightSideBarMode";
const SET_CAFELIST = "setCafeList";
const SET_CAFEMARKER = "addCafeMarker"
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

const setCafeList = (data) => {
    return {
        type: SET_CAFELIST,
        cafeList: data,
    }
}
const addCafeMarker = (data) =>{
    return {
        type: SET_CAFEMARKER,
        cafemarker : data
    }
}
export const actionCreators = {
    setMap,
    addGuArea,
    addDongArea,
    addGuMarker,
    addDongMarker,
    setMaplevel,
    setGuNum,
    setDongNum,
    setRightSideBarMode,
    setCafeList,
    addCafeMarker,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;