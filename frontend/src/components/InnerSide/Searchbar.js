import React, { Fragment } from 'react';

const Searchbar = () => {

    return (
        <Fragment>
            <input type="text" placeholder='검색할 내용을 입력해주세요'></input>
            <button>검색</button>
        </Fragment>
    );
}

export default Searchbar;