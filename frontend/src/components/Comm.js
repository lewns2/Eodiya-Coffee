import React, {useState} from 'react';
import '../styles/Comm.css';
const Search = (props) => {
    // 3. 행정 구역 보기 토글 버튼
    var [displayDivision, setdisplayDivision] = useState(0);
    const handleDisplay = () => {
        displayDivision ^= 1;
        console.log("행정구 활성화 버튼", displayDivision);
        setdisplayDivision(displayDivision);
        props.setdisplayDivision(displayDivision);
      }
        return (
            <div id='Comm'>
                <button type="submit" onClick={handleDisplay}>행정 구역 보기</button>
                <button type="submit">구역 보기</button>
                <button type="submit">구역 보기</button>
            </div>
        );
}

export default Search;