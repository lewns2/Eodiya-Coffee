import React, { Fragment, useEffect, useState } from 'react';
import '../../styles/Sidebar.css'

export const Sidebar = ({width, height, children}) => {
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
                <button 
                    onClick={() => toggleMenu()}
                    className="toggle-menu"
                    style={{
                        transform: `translate(${width}px, 20vh)`
                    }}
                    > &gt;
                </button>
                <div className="content">{children}</div>
            </div>
        </Fragment>
    );
}

export default Sidebar;