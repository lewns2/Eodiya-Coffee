// actions는 리듀서(reducer)로 데이터 생성을 요청한다.
import axios from 'axios';

// action type(명령어)
export const GET_DISTRICT = 'GET_DISTRICT'

// action creators(액션 메서드)
export function getArea(guName) {
    try {
        // const res = axios.get(`http://127.0.0.1:8000/api/v1/${guName}`);
        const res = axios.get('https://dog.ceo/api/breeds/list/all');
        return res;
        // return {type: GET_DISTRICT, payload : res };
    }
    catch(error) {
        console.log(error, "여깁니다!");
        return error;
    }
    // return {type:GET_DISTRICT, guName};
}

