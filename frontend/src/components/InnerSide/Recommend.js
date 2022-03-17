import React, { Fragment } from 'react';

const MainCategory = [
    {value: "franchise", name: "프랜차이즈"},
    {value: "privatecafe", name: "개인 카페"},
];



const Recommend = (props) => {

    const subCategory = ["브런치", "스터디", "키즈", "디저트", "룸카페"];

    const rendering = (targetArray) => {
        const result = [];
        for(let i=0; i<targetArray.length; i++) {
            result.push(<button key={i}>{targetArray[i]}</button>);
        }
        return result;
    }

    return (
        <Fragment>
            <h3>대분류</h3>
            <select>
                <option key="franchise" value="franchise">프랜차이즈</option>
                <option key="privatecafe" value="privatecafe">개인 카페</option>
            </select>

            <h3>중분류</h3>
            <div>{rendering(subCategory)}</div>

            <h3>주변 환경</h3>
        </Fragment>
    );
}

export default Recommend;