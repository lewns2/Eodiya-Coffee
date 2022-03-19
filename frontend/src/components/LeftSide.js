import React, { useEffect, useState } from 'react';
import Sidebar from './InnerSide/Sidebar';
import Searchbar from './InnerSide/Searchbar';
import Recommend from './InnerSide/Recommend';

const LeftSide = (props) => {

    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        console.log("LeftSide : ", keyword, '로 변경되었음.')
        return() => {
            props.setSearchKeyword(keyword);
        }
    }, [keyword])

    return (
            <div className='Leftbar'>
                <Sidebar width={300} height={"100vw"} >
                    <h2>어떤 카페를 준비하시나요?</h2>
                    <Searchbar setKeyword={setKeyword}/>
                    <Recommend></Recommend>
                    <h1>안녕</h1>
                    <h1>안녕</h1>
                </Sidebar>
            </div>

    );
}

export default LeftSide;