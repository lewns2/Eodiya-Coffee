import React, { useEffect } from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";

import useGeolocation from "../actions/useGeolocation";

const EodiyaMap = () => {

    // useSelector는 reducer에 정의되어 있는 것을 가져온다.
    const map = useSelector(state => state.setMap.map);

    const { getGeo } = useGeolocation();
    // const test = useSelector(state => state.setMap.eodiyaMap);
    
    useEffect(() => {
        // console.log(test);
        getGeo();
      }, [map, getGeo]);

    return (
        <div>
            <h3>REDUX 테스트용입니다.</h3>
            <Map></Map>
        </div>
    )
}

export default EodiyaMap;