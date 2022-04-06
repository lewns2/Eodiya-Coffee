import React, { useEffect } from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";

// import useGeolocation from "../actions/useGeolocation";
import useSetMarker from "../actions/useSetMarker";
import useCafeMarker from "../actions/useCafeMarker";



const EodiyaMap = () => {

    // useSelector는 reducer에 정의되어 있는 것을 가져온다.
    // const map = useSelector(state => state.setMap.map);
    const { map, mapLevel, guMarker, dongMarker} = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        mapLevel : state.setMap.eodiyaMap.mapLevel,
        guMarker : state.setMap.eodiyaMap.guMarker,
        dongMarker : state.setMap.eodiyaMap.dongMarker,
    }))

    const {setMarker} = useSetMarker();
    // const { getGeo } = useGeolocation();
       
    useEffect(() => {
        console.log(mapLevel);
        if(mapLevel >= 8) {
            setMarker();
            dongMarker.map(value => {
                value.setMap(null);
            })
        }
        else if(mapLevel <= 6) {
            console.log(guMarker);
            guMarker.map(value => {
                value.setMap(null);
            })
        }
        // getGeo();
      }, [map, mapLevel]);

    return (
        <div>
            <h3>REDUX 테스트용입니다.</h3>
            <Map></Map>
        </div>
    )
}

export default EodiyaMap;