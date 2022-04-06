import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import actionCreators from "./actionCreators";
import { useEffect, useState } from "react";

const {kakao} = window;

export const useSelectDongData = () => {
    const dispatch = useDispatch();
    const { map } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
    }))
    const getSelectedDongData=(guName, dongName) =>{
        var leftDong = [];
        axios
            .get(
                `/search/${guName}/${dongName}`,
                {
                headers: {
                    "Content-type": "applicsation/json",
                    Accept: "*/*",
                },
                }
            )
            .then((response) => {
                console.log(response.data, "from search");
                leftDong = response.data.XYInfo[0];
                dispatch(actionCreators.setGuNum(guName), guName);
                dispatch(actionCreators.setDongNum(dongName), [dongName]);
                dispatch(actionCreators.setRightSideBarMode(1), []);
                dispatch(actionCreators.setIsRightOpen(true), []);
                dispatch(actionCreators.setSearchedDongData(response.data.detail[0]), []);
            })
            .then(()=> {
                map.setLevel(6);
                map.panTo(new kakao.maps.LatLng(leftDong.dongCenterYPoint, leftDong.dongCenterXPoint));
            })
            .catch((response) => {
                console.log("Error!");
                console.log(response, "from search");
            });
    }
    return {getSelectedDongData};
}
export default useSelectDongData;