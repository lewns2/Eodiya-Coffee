// reducer를 하나로 합치는 파일.
import districtArea from "./districtArea";
import { combineReducers } from "redux";

export default combineReducers({
    districtArea,
});