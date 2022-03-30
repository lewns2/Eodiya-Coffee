// actions는 리듀서(reducer)로 데이터 생성을 요청한다.
import axios from 'axios';

const ADD_AREA = "ADD_AREA";


function getArray({data}) {
    return { type : ADD_AREA, data};
}


function getArea(guName) {
    return (dispatch) => {
        return axios.get(`http://127.0.0.1:8000/api/v1/${guName}`)
        .then((res) => {
            console.log(res)
            dispatch(getArray(res.data));
            // .then(data => dispatch(getArray(res.data)))
            
        })
    }
}


// function getArea(guName) {
//     return axios.get(`http://127.0.0.1:8000/api/v1/${guName}`)
//     .then ((res) => {
//         // console.log(res);
//         return {
//             type : ADD_AREA,
//             payload : res.data
//         }
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }

export {
    getArea,
    ADD_AREA
};