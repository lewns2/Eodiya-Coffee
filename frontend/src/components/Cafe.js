import React, { Component } from 'react';
import '../styles/Cafe.css';
class Search extends Component {
    render() {
        return (
            <div className='Cafe'>
                <h3>카페를 선택</h3>
                <div>
                    <ul>
                        <li>스터디</li>
                        <li>디저트</li>
                        <li>키즈</li>
                        <li>브런치</li>
                        <li>무인</li>
                        <li>애견</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Search;