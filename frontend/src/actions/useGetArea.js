import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import actionCreators from "./actionCreators";
import useDrawArea from "./useDrawArea";

// const BASE = 'http://127.0.0.1:8000/api/v1';

export const useGetArea = (guName) => {
  const dispatch = useDispatch();

  const { drawArea } = useDrawArea();

  const getArea = async (guName) => {
    await axios
      .get(`/${guName}`)
      .then((res) => {
        console.log("요청 응답", res);
        dispatch(actionCreators.addGuArea(res.data.guInfo, "gu"));
        dispatch(actionCreators.addDongArea(res.data.dongInfo, "dong"));
      })
      .catch((error) => {
        console.log(error);
      });
    await drawArea();
  };

  return { getArea };
};

export default useGetArea;
