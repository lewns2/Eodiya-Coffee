import React, { Component, useState } from 'react';
import Sidebar from './InnerSide/RightSidebar';
import Modal from 'react-modal';
import Option1 from './InnerSide/Option1';
import Option2 from './InnerSide/Option2';
import Option3 from './InnerSide/Option3';


function RightSide() {
    const [isOption1Open, setisOption1Open] = useState(true);
    const [isOption2Open, setisOption2Open] = useState(false);
    const [isOption3Open, setisOption3Open] = useState(false);
    function OpenOption1(){
        setisOption1Open(true)
        setisOption2Open(false)
        setisOption3Open(false)
    }
    function OpenOption2(){
        setisOption1Open(false)
        setisOption2Open(true)
        setisOption3Open(false)
    }
    function OpenOption3(){
        setisOption1Open(false)
        setisOption2Open(false)
        setisOption3Open(true)
    }
    return (
        <div className='Rightbar'>
            <Sidebar width={300} height={"100vw"}>
                <h2>카페 정보</h2>
                <button onClick={() => OpenOption1()}>Option1</button>
                <button onClick={() => OpenOption2()}>Option2</button>
                <button onClick={() => OpenOption3()}>Option3</button>
                {isOption1Open ? <Option1/> : null }
                {isOption2Open ? <Option2/> : null }
                {isOption3Open ? <Option3/> : null }

            </Sidebar>
        </div>
    );
}

export default RightSide;