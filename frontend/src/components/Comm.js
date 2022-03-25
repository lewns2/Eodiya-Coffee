import React, {useState} from 'react';
import '../styles/Comm.css';
const Comm = (props) => {
    // 3. 행정 구역 보기 토글 버튼
    var [displayDivision, setdisplayDivision] = useState(0);
    const [visible, setVisible] = useState("block");
    const handleDisplay = () => {
        displayDivision ^= 1;
        console.log("행정구 활성화 버튼", displayDivision);
        setdisplayDivision(displayDivision);
        props.setdisplayDivision(displayDivision);
      }
    const rightSide = () =>{
        console.log('Click.....');
        props.setClick(true);
    }

    const close = () => setVisible("none");
    const open = () => setVisible("block");
    return (
        <div id='Comm'
        >
            <p>동, 행정구역</p>
            <button onClick={() =>open()}>열기</button>
            <div style={{
                display: visible
            }}>
            <button type="submit" onClick={handleDisplay}>행정 구역 보기</button>
            <button type="submit">구역 보기</button>
            <button type="submit">구역 보기</button>
            <button type="submit" onClick={rightSide}>분석 하기</button>
            <button onClick={() =>close()}>닫기</button>
            </div>
        </div>
    );
}

export default Comm;