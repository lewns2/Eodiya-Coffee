import React, { useEffect, useState } from 'react';
import '../styles/Cafe.css';
const Cafe =() => {
    const [visible, setVisible] = useState("none");
    function click() {
        if(visible ==="none"){
            setVisible("block");
        }else{
            setVisible("none");
        }
    }
    useEffect(() =>{
        addCafeClickEvent();
        function addCafeClickEvent(){
            var category = document.getElementById('category'),
                children = category.children;
    
            for(var i=0; i<children.length; i++){
                children[i].onclick = onClickCategory;
            }
        }
        function onClickCategory(){
            var id = this.id,
                className = this.className;
             console.log(id, className);
        }
    })
    return (
        <div className='Cafe'>
            <div>
                <h3>카페를 선택</h3>
                <button onClick={() => click()}>{visible ==="none"? "열기" : "닫기"}</button>
            </div>
            <div
                style={{
                    display : visible
                }}
            >
                <ul id ="category">
                    <li id="study">
                        <span className="category_bg study"></span>
                        스터디
                    </li>
                    <li id="dessert">
                        <span className="category_bg dessert"></span>
                        디저트
                    </li>
                    <li id="kids">
                        <span className="category_bg kids"></span>
                        키즈
                    </li>
                    <li id="brunch">
                        <span className="category_bg brunch"></span>
                        브런치
                    </li>
                    <li id="unstaff">
                        <span className="category_bg unstaff"></span>
                        무인
                    </li>
                    <li id="dog">
                        <span className="category_bg dog"></span>
                        애견
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cafe;