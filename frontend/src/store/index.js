// // 미들웨어를 설정한다.
// import { createStore, compose, applyMiddleware } from "redux"; 
// import thunk from "redux-thunk";

// var state = {
//     eodiyaMap : {
//         map : null,
//         guMarker : [],
//         dongMarker : [],
//         overlay: []
//     }
// }

// export default function configureStore(reducer, initialState = state) {
    
//     const enhancer = compose(
//         applyMiddleware(thunk, /* , middleware 추가 */),
//         window.devToolsExtension ? window.devToolsExtension() : f => f
//     );

//     return createStore(reducer, enhancer, );
// }