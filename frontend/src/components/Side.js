import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Side extends Component {
    render() {
        return (
            <Sidebar width={300} height={"100vh"}>
                <h1>안녕</h1>
                <h1>안녕</h1>
                <h1>안녕</h1>
                <h1>안녕</h1>
            </Sidebar>
        );
    }
}

export default Side;