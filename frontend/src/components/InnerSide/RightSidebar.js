import React, { Fragment, useEffect, useState } from 'react';
import '../../styles/Sidebar.css';
import Option1 from './Option1';
import Option2 from './Option2';
import Option3 from './Option3';
// {width, height, children, click},
const RightSidebar = (props) => {
    const [xPosition, setX] = useState(-props.width);
    const toggleMenu =() => {
        console.log("버튼이 눌렸다.", xPosition)
        if(xPosition < 0) {
            setX(0);
        } else {
            setX(-props.width);
        }
    };

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
    useEffect(() => {
        setX(0);
    },[]);

    return (
        <Fragment>
            <div className='Rightbar'>
                <div
                    className="side-bar"
                    style={{
                        transform: `translatex(${xPosition}px)`,
                        width: props.width,
                        minHeight: props.height,
                    }}
                >
                    <h2>카페 정보</h2>
                        <button onClick={() => OpenOption1()}>Option1</button>
                        <button onClick={() => OpenOption2()}>Option2</button>
                        <button onClick={() => OpenOption3()}>Option3</button>
                        {isOption1Open ? <Option1/> : null }
                        {isOption2Open ? <Option2/> : null }
                        {isOption3Open ? <Option3/> : null }
                    <div className="content">{props.children}</div>
                    <button 
                        onClick={() => toggleMenu()}
                        className="toggle-menu2"
                        style={{
                            transform: `translate(-10px, 20vh)`
                        }}
                        > &lt;
                    </button>
                </div>

            </div>
        </Fragment>
    );
}

export default RightSidebar;