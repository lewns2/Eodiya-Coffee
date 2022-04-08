import React, { useState, Fragment, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Searchbar = (props) => {
    const [inputText, setInputText] = useState("");
    const [place, setplace] = useState(props.setKeyword);

    useEffect(() => {
        props.setKeyword(place);

    }, [place])

    const onChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setplace(inputText);
        setInputText("");
    }



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