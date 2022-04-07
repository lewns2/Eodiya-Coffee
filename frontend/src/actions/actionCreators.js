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
const SET_ISRIGHTOPEN = "setIsRightOpen";
const SET_SEARCHEDDONGDATA = "setSearchedDongData";
const SET_LEFTDONG = "setLeftDong";
const SET_COMMAREA = "setCommArea";
const SET_CAFELIST = "setCafeList";
const SET_GUOVERLAY = "setGuOverlay";
const SET_ISLOADING = "setIsLoading";
const SET_CAFEMARKER = "setCafeMarker";
const SET_GUPOLY = "setGuPoly"
const SET_THEMEGUDATA = "setThemeGuData";
const SET_THEMENUM = "setThemeNum";
const SET_THEMEAREA = "setThemeArea";
const ADD_THEMEAREA = "addThemeArea";
const ADD_SANGGWONAREADATA = "addSanggwonAreaData";

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

const setIsRightOpen = (isopen) => {
    return {
        type : SET_ISRIGHTOPEN,
        isRightOpen : isopen,
    }
}

const setSearchedDongData = (dongdata) => {
    return {
        type : SET_SEARCHEDDONGDATA,
        searchedDongData : dongdata,
    }
}

const setLeftDong = (data) => {
    return {
        type : SET_LEFTDONG,
        leftDong : data, 
    }
}

const setCommArea = (data) => {
    return {
        type : SET_COMMAREA,
        commArea : data,
    }
}

const setCafeList = (data) => {
    return {
        type: SET_CAFELIST,
        cafeList: data,
    }
}
const setCafeMarker = (data) =>{
    return {
        type: SET_CAFEMARKER,
        cafeMarker : data
    }
}

const setGuOverlay = (data) => {
    return {
        type : SET_GUOVERLAY,
        guOverlay : data,
    }
}

const setIsLoading = (isLoading) =>{
    return {
        type: SET_ISLOADING,
        isLoading : isLoading
    }
}

const setGuPoly = (data) => {
    return {
        type : SET_GUPOLY,
        guPoly : data,
    }
}
const setThemeGuData = (data) => {
    return {
        type: SET_THEMEGUDATA,
        themeGuData : data
    }   
}

const setThemeNum = (selecttheme) => {
    return {
        type: SET_THEMENUM,
        themeNum : selecttheme
    
    }
}

const setThemeArea = (data) => {
    return {
        type : SET_THEMEAREA,
        themeArea : data,
    }
}

const addThemeArea = (data) => {
    return {
        type : ADD_THEMEAREA,
        themeAreaData : data,
    }
}

const addSanggwonAreaData = (data) => {
    return {
        type : ADD_SANGGWONAREADATA,
        sanggwonAreaData : data,
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
    setIsRightOpen,
    setSearchedDongData,
    setLeftDong,
    setCommArea,
    setCafeList,
    setGuOverlay,
    setIsLoading,
    setCafeMarker,
    setGuPoly,
    setThemeGuData,
    setThemeNum,
    setThemeArea,
    addThemeArea,
    addSanggwonAreaData,
}

// 중요! 하나로 묶어서 보내기. (default)
export default actionCreators;