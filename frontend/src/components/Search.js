import React, { useState, useEffect } from 'react';
import '../styles/Search.css';
import Searchbar from './InnerSide/Searchbar';
const Search =(props) => {
    
    const [keyword, setKeyword] = useState("");
    useEffect(() => {
        // console.log("LeftSide : ", keyword, '로 변경되었음.')
        props.setSearchKeyword(keyword);
        // return() => {
        //     props.setSearchKeyword(keyword);
        // }
    }, [keyword])
    useEffect(() =>{
        setKeyword(props.setSearchKeyword)
    })
        return (
            <div className='Search'>
                <Searchbar setKeyword={setKeyword}></Searchbar>
            </div>
        );
}

export default Search;