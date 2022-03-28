import React, {useState} from 'react';
import '../styles/Comm.css';

const gu =[
    "강남구","강동구","강북구","강서구","관악구","광진구","구로구",
    "금천구","노원구","도봉구","동대문구","동작구","마포구",
    "서대문구","서초구","성동구","성북구","송파구","양천구",
    "영등포구","용산구","은평구","종로구","중구","중랑구"];
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
    const guList = () => {
        const list =[];
        console.log(gu.length);
        for(var i=0; i< gu.length; i++){
            console.log(i, gu[i]);
        }
        return list;
    }
    const click = () =>{
        if(visible ==="none"){
            setVisible("block");
            
        }else{
            setVisible("none");
        }
    }
    return (
        <div id='Comm'>
            <p>동, 행정구역</p>
            <button onClick={() =>click()}>{visible ==="block"? "닫기" : "열기"}</button>
            <div style={{ 
                display: visible
            }}>
                <select id="sido">
                    <option value="0">서울시</option>
                </select>
                <select id="gu">
                    <option value="0">{guList()}</option>
                </select>
                <select id="dong">
                    <option value="0">선택</option>
                </select>
                <button type="submit" onClick={handleDisplay}>행정 구역 보기</button>
                <button type="submit">구역 보기</button>
                <button type="submit">구역 보기</button>
                <button type="submit" onClick={rightSide}>분석 하기</button>
            </div>
        </div>
    );
}

export default Comm;