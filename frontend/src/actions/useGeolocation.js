import { useSelector } from "react-redux";

var kakaoMap = {};

const useGeolocation = () => {
    const map = useSelector(state => state.setMap.map);

    kakaoMap = map;

    const getGeo = () => {
        if(kakaoMap !== null) {
            console.log("지도 시작!")
        }
        else {
            console.log("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
        }
    }
    return { getGeo };
}

export default useGeolocation;