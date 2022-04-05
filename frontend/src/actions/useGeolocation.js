import { useSelector } from "react-redux";
var kakaoMap = {};

const useGeolocation = () => {

    const { map } = useSelector(state => ({
        map : state.setMap.eodiyaMap.map
    }))
    
    kakaoMap = map;

    const getGeo = () => {
        if(kakaoMap !== null) {
            console.log("지도 시작!")
        }
        else {
            console.log("현재 지도가 없습니다.");
        }
    }
    return { getGeo };
}

export default useGeolocation;