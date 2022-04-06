import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import actionCreators from "./actionCreators";
import { useEffect, useState } from "react";


const BASE = 'http://127.0.0.1:8000/api/v1';

export const useSelectDongData = () => {
    const dispatch = useDispatch();
    const [selectDongData, setSelectDongData] = useState('');

    const getSelectedDongData=(guName, dongName) =>{
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
                dispatch(actionCreators.setSearchedDongData(response.data.dongInfo[0]), []);
                dispatch(actionCreators.setGuNum(guName), [guName]);
                dispatch(actionCreators.setDongNum(dongName), [dongName]);
                dispatch(actionCreators.setRightSideBarMode(1), []);
                dispatch(actionCreators.setIsRightOpen(true), []);
            })
            .catch((response) => {
                console.log("Error!");
                console.log(response, "from search");
            });
    }
    return {getSelectedDongData};
}
export default useSelectDongData;