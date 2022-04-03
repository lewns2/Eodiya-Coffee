// reducer를 하나로 합치는 파일.
import { combineReducers } from "redux";
import setMap from "./setMap";
import getArea from "./getArea";

export default combineReducers({
    setMap,
    getArea,
});