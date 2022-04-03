// 미들웨어를 설정한다.
import { createStore, compose, applyMiddleware } from "redux"; 
import thunk from "redux-thunk";

export default function configureStore(reducer) {
    
    const enhancer = compose(
        applyMiddleware(thunk /* , middleware 추가 */)
    );

    return createStore(reducer, enhancer);
}