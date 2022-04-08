import { useDispatch } from "react-redux";
import axios from "axios";
import actionCreators from "./actionCreators";
import useDrawArea from "./useDrawArea";

export const useGetArea = (guName) => {
  const dispatch = useDispatch();

  const { drawArea } = useDrawArea();

  const getArea = async (guName) => {
    await axios
      .get(`/${guName}`)
      .then((res) => {
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
