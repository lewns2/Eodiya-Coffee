import React, { Fragment, useEffect, useState } from 'react';
import '../../styles/Sidebar.css'

export const RightSidebar = ({width, height, children}) => {
    const [xPosition, setX] = useState(-width);

    const toggleMenu = () => {
        console.log("버튼이 눌렸다.", xPosition)
        if(xPosition < 0) {
            setX(0);
        } else {
            setX(-width);
        }
    };

    useEffect(() => {
        setX(0);
    }, []);

    return (
        <Fragment>
            <div
                className="side-bar"
                style={{
                    transform: `translatex(${xPosition}px)`,
                    width: width,
                    minHeight: height,
                }}
            >
                <div className="content">{children}</div>
                <button 
                    onClick={() => toggleMenu()}
                    className="toggle-menu2"
                    style={{
                        transform: `translate(-10px, 20vh)`
                    }}
                    > &lt;
                </button>
            </div>
        </Fragment>
    );
}

export default RightSidebar;