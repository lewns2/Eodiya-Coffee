import LeftSide from './LeftSide';
import RightSide from './RightSide';
import '../styles/Map.css'
import './MapFeat/Category';
import Category from './MapFeat/Category';
const Map=()=>{

      return (
          <div className='Map'>
            <div className='map_wrap'>
              <div id="map" style={{width:"100vw", height:"90vh", position:"relative", overflow:"hidden"}}></div>
              <Category/>           
            </div>
              <p id ="result">asd</p>
              <LeftSide/>
              <RightSide/>
          </div>
      )
  }
export default Map;