import React, { useState, useEffect } from 'react';
import '../styles/Search.css';
import Searchbar from './InnerSide/Searchbar';

const Search =(props) => {
    const [keyword, setKeyword] = useState();
    useEffect(() => {
        setKeyword(props.setSearchKeyword);
    }, [])
    useEffect(() => {
        props.setSearchKeyword(keyword);
    }, [keyword])

        return (
            <div className='Search'>
                <Searchbar setKeyword={setKeyword}></Searchbar>
            </div>
        );
}

export default Search;