import React, { useState, Fragment } from 'react';

const Searchbar = ({ props }) => {
    const [inputText, setInputText] = useState("");
    const [place, setplace] = useState("");

    console.log(props)

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setplace(inputText);
        setInputText("");

        // props.setKeyword = place;
        console.log(props.setKeyword, "자식입니다");

    }

    return (
        <Fragment>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    type = "text"
                    placeholder='검색할 내용을 입력해주세요'
                    onChange={onChange}
                    value={inputText}
                >
                </input>
                <button type="submit" onClick={() => props.setKeyword("동래구")}>검색</button>
            </form>
            <h1>{place}</h1>
            
        </Fragment>
    );
}

export default Searchbar;