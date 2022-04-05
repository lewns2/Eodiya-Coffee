import React, { useState, Fragment, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Searchbar = (props) => {
    const [inputText, setInputText] = useState("");
    const [place, setplace] = useState("");

    const onChange = (e) => {
        if(e.target.value)
        setInputText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setplace(inputText);
        setInputText("");
    }
    useEffect(() => {
        // console.log("Searchbar : ", place, '로 변경되었음.')
        props.setKeyword(place);
        // return () => {
        //     props.setKeyword(place);
        // };
    }, [place])
    useEffect(() => {
        setplace(props.setKeyword)
    }, [])


    return (
        <Fragment>
            <form className="inputForm" onSubmit={handleSubmit}>
                <TextField placeholder="동 이름으로 검색" onChange={onChange} value={inputText} size="small"></TextField>
                <Button variant='outlined' type='submit' >검색</Button>
            </form>
        </Fragment>
    );
}

export default Searchbar;