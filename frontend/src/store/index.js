// 미들웨어를 설정한다.
import { createStore, compose, applyMiddleware } from "redux"; 
import thunk from "redux-thunk";

export default function configureStore(reducer, initialState = {}) {
    
    const enhancer = compose(
        applyMiddleware(thunk, /* , middleware 추가 */),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    );

    return createStore(reducer, initialState, enhancer);
}