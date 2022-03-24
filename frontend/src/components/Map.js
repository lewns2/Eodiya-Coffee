import React, { Component, useState, useEffect, useRef } from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
// import testjson from '../assets/test.json';
// import geojson from '../assets/seoul_sigungudong.json';
// import sanggwonjson from '../assets/seoul_sanggwon.json';
// import sigungujson from '../assets/seoul_sigungu.json';

const { kakao } = window;

var mapCenter = new kakao.maps.LatLng(37.56690518860781, 126.97808628226417);
const options = {
  center: mapCenter,
  level: 8
}

const locationSeoulGu = [
  {latlng: new kakao.maps.LatLng(37.56690518860781, 126.97808628226417), name: "서울시"},
  {latlng: new kakao.maps.LatLng(37.49687271073225, 127.0453244288338), name: "강남구"},
  {latlng: new kakao.maps.LatLng(37.54448648571196, 127.16518837385559), name: "강동구"},
  {latlng: new kakao.maps.LatLng(37.61939265652918, 127.00803235772581), name: "강북구"},
];

const testGangbuk = [{
  name : '강북구',  // 구 이름
  area : [[127.00456669928377,37.685079809932695],[127.00552944076941,37.68486524210563],[127.00866351452713,37.68444952141505],[127.0124440453933,37.652183699689495],[127.04259884914923,37.63045140883515],[127.04973665620547,37.62426629764204],[127.0497051421607,37.6242480116188],[127.04935721171294,37.6240516224937],[127.04928585549708,37.62401082801155],[127.04924142349843,37.623985222127374],[127.04919803439607,37.62396075103935],[127.04852504483249,37.623576131523144],[127.04822617458555,37.62340703719239],[127.04790640954319,37.62322471492216],[127.04750768358487,37.622989490014604],[127.04743756304615,37.62294700008334],[127.04689895984963,37.6226222970845],[127.04686761675994,37.622603442614974],[127.04666450762,37.62243937096895],[127.04656004063781,37.62235466471928],[127.04652762652059,37.62232510692628],[127.04632307661466,37.62211712147273],[127.04630272038209,37.62209656883751],[127.04612718923744,37.62192139472005],[127.04608064032381,37.62187507490702],[127.04592033017944,37.62165524215832],[127.04588065245423,37.621600918976405],[127.04575170161671,37.62142668180501],[127.04570564123979,37.62136278353638],[127.04562201115762,37.621207395760834],[127.04559265336418,37.621153753365526],[127.04521378705036,37.62044733662481],[127.04504919417691,37.62013825312257],[127.04470511327746,37.61949305241152],[127.04467889674763,37.61944350808388],[127.04457174389962,37.61932557285603],[127.04453083960054,37.61928138567468],[127.04409643116806,37.61880684365606],[127.0440452471034,37.61875055083345],[127.04402259067056,37.61872578203305],[127.04395865588683,37.61865513213506],[127.0439474922587,37.6186433152854],[127.04392377580642,37.61862670972966],[127.04377539164442,37.61852145635508],[127.04373166404268,37.618490505304685],[127.04359003403657,37.61839032179864],[127.04356946771797,37.61837572423448],[127.04353054471152,37.618348105024594],[127.04334799810255,37.61821894223057],[127.04325133138025,37.61815055599109],[127.04320883913859,37.61812016291598],[127.04313801896839,37.61806978706031],[127.04302825347514,37.617991557537316],[127.04277170519121,37.61781032515078],[127.04269220611047,37.617754032615636],[127.04257712733103,37.617672146540855],[127.04249374226994,37.61761361178073],[127.04239653297091,37.61754437810023],[127.04212175496356,37.61734795105526],[127.04183405545108,37.617131814320615],[127.04152724155374,37.61692159379124],[127.0414272226217,37.616868974341074],[127.04138566184474,37.61684085976883],[127.04134436413199,37.61681747524199],[127.04127284114051,37.61676133221561],[127.041171034101,37.61668943216064],[127.04116023664555,37.61668324604999],[127.04096780791564,37.616571246538676],[127.04062695964568,37.61624700688506],[127.0405233761909,37.616154402313455],[127.04001525615276,37.61577165227352],[127.04000195276993,37.61571563361864],[127.03990101342387,37.61558587117589],[127.0399002942193,37.61557488845209],[127.03989405414582,37.615488171064705],[127.03987916550128,37.615432702507064],[127.03966914892258,37.61518134282824],[127.03964081451763,37.6151447451256],[127.0396153216279,37.615127589669065],[127.03958982874072,37.6151104161873],[127.03820943342183,37.614016440663846],[127.03822091822236,37.61399364226878],[127.03819525601416,37.613976189230826],[127.03815046859171,37.61394494810271],[127.03790934023377,37.61376791682065],[127.0378519397169,37.61362829142324],[127.03782111845237,37.61357536825892],[127.03745713388098,37.612917483995545],[127.03742739501638,37.61290031133283],[127.03735622705432,37.6128383904953],[127.03734151993548,37.612825763201315],[127.03732205400537,37.612809118972265],[127.03731108651321,37.61280078822109],[127.03730682642784,37.612797582019226],[127.0372956779401,37.612789701812176],[127.03727921584503,37.61277816522979],[127.03727336977947,37.612774220702526],[127.03708377864508,37.612641671544644],[127.03678035795532,37.61242636495889],[127.03676601687833,37.612421017412935],[127.0361761591313,37.61235841171026],[127.03609598648332,37.612340694900766],[127.0361116000938,37.61242825671203],[127.03604877757385,37.61243278001582],[127.03600311271705,37.61241054813533],[127.03533466919625,37.61195574590311],[127.03351832096891,37.61077624573932],[127.03196175304595,37.60989397466831],[127.0317647880775,37.609801638629435],[127.0302592121429,37.60897371514489],[127.0302501876814,37.608978501556365],[127.0303134597902,37.61058758567321],[127.03031416892364,37.61060560513483],[127.03034469788639,37.611297380423466],[127.03034398827901,37.61130751664001],[127.02684145802169,37.612676406465454],[127.02683561423449,37.61267753394586],[127.02682835470843,37.61267866172962],[127.02456460385932,37.61214134764753],[127.02447982240983,37.61207971000694],[127.0234421625137,37.61173358802872],[127.02329154960275,37.611684908845056],[127.02257617980884,37.61140067083131],[127.02250378806197,37.611368302445086],[127.02249707191545,37.611368303639004],[127.02219782476139,37.611371167510555],[127.02213571735837,37.611381314418956],[127.02067197748505,37.612511445932185],[127.0206659638747,37.61251314075302],[127.02065940669317,37.612515114965966],[127.0204322049696,37.61258694179425],[127.02039628200403,37.61259793050902],[127.01854514683215,37.61385564865526],[127.01853947246192,37.6138556494737],[127.01781826197866,37.61437859967905],[127.01781755119458,37.61439126757237],[127.01777686497151,37.61443125872776],[127.01653445220454,37.61494216249539],[127.01652117755347,37.614940758652985],[127.01094918201996,37.61628689639997],[127.01093767448135,37.616288023544904],[127.01011516011185,37.616892869695945],[127.01013853266441,37.616943827464354],[127.00816685846083,37.619319165068866],[127.00803235772581,37.61939265652918],[127.00794935525421,37.619407302011574],[127.00794422439719,37.61941012235964],[127.00786638893231,37.619847660654855],[127.00786373946737,37.61986004927681],[127.00759349019982,37.62001914057828],[127.00757101939291,37.620043918690804],[127.00724860721401,37.620786405569255],[127.00721020005791,37.62082807776068],[127.00757679865328,37.621470845769785],[127.00758228321119,37.6214975955867],[127.00558297060526,37.623847833347114],[127.00556509553847,37.62384586081553],[126.99651665178031,37.629067287449914],[126.99649982759698,37.629089802198116],[126.99604100854972,37.62934656076568],[126.99137997811071,37.63260498377816],[126.99136741359557,37.632610334509145],[126.98993374172927,37.63279856096716],[126.98992736260514,37.6328044707584],[126.98591770163266,37.635788777910605],[126.9853777477391,37.63597003607466],[126.9844140702289,37.636269760213786],[126.98446134688953,37.63654765013691],[126.99219757789712,37.679626923004186],[127.00456669928377,37.685079809932695]],
  movePeople : 500000,  // 유동 인구
  money : 41241204214125125,  // 매출
}]


const Map=()=>{

    // 1. 지도를 담을 영역의 DOM 레퍼런스
    const container = useRef(null);

    // 2. 검색 키워드를 관리하는 훅
    const [searchKeyword, setSearchKeyword] = useState("");

    // 3. 행정 구역 보기 토글 버튼
    var [displayDivision, setdisplayDivision] = useState(0);

    // 4. 상권 구역 보기 토글 버튼
    var [displaySanggwon, setdisplaySanggwon] = useState(0);

    const handleDisplay = () => {
      displayDivision ^= 1;
      console.log("행정구 활성화 버튼", displayDivision);
      setdisplayDivision(displayDivision);
    }

    const handleDisplaySanggwon = () => {
      displaySanggwon ^= 1;
      console.log("상권구역 활성화 버튼", displayDivision);
      setdisplaySanggwon(displaySanggwon);
    }
    

    useEffect(()=>{
      // + 기능 1. 지도 생성 및 화면 표시
        // 1.1 지도 생성 및 객체 리턴
      var map = new window.kakao.maps.Map(container.current, options);

      // + 기능 4. 지도에 시군구동 마커 띄우기
      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

      for(var i=0; i<locationSeoulGu.length; i++) {

        var imageSize = new kakao.maps.Size(30, 50);
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
          position: locationSeoulGu[i].latlng,
          title : locationSeoulGu[i].name,
          image : markerImage,
        });

        marker.setMap(map);
      }
        // 4.1 BackEnd로 요청보내기 (데이터 받아온다.)

        // 4.2 마커 클릭 이벤트 : 1. 줌인 & 마커 위치로 지도 이동, 2. 구 영역 표시
        kakao.maps.event.addListener(marker, 'click', function () {
          var level = map.getLevel();
          map.setLevel(level - 1);

          console.log(marker);
          
          // console.log(testGangbuk[0]);
          let path = [];
          let points = [];
          let polygons = [];
          
          for(var i=0; i<testGangbuk[0].area.length; i++) {
            let point = {};
            point.x = testGangbuk[0].area[i][1];
            point.y = testGangbuk[0].area[i][0];
            points.push(point);
            path.push(new kakao.maps.LatLng(point.x, point.y));
          }

          let polygon = new kakao.maps.Polygon({
            map : map,
            path: path,
            strokeWeight: 2, // 선의 두께입니다
            strokeColor: '#004c80', // 선의 색깔입니다
            strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
            fillColor: '#fff', // 채우기 색깔입니다
            fillOpacity: 0.7, // 채우기 불투명도 입니다
          });
          polygons.push(polygon);

          const customOverlay = new kakao.maps.CustomOverlay({});

          kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
              polygon.setOptions({ fillColor: '#09f' });
          
              customOverlay.setPosition(mouseEvent.latLng);
              customOverlay.setMap(map);
          });
          
              // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
          kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
            customOverlay.setPosition(mouseEvent.latLng);
          });
          
              // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
              // 커스텀 오버레이를 지도에서 제거합니다
          kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
          });

        });
        

        // 1.2 마커 생성 (중심부에)
      
      // if(!displayDivision && !displaySanggwon) {
        // var marker = new kakao.maps.Marker({ 
        //   position: map.getCenter() 
        // }); 
        
          // 1.3 지도에 마커를 표시합니다
        // marker.setMap(map);
      //   kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
      
      //     // 1.4 클릭한 위도, 경도 정보를 가져옵니다 
      //   var latlng = mouseEvent.latLng;
  
      //   marker.setPosition(latlng);
          
      //   var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
      //   message += '경도는 ' + latlng.getLng() + ' 입니다';
          
      //   var resultDiv = document.getElementById('result'); 
         
      //   resultDiv.innerHTML = message;
      // });
    // }

    // + 기능 2. 검색 시 해당 위치로 이동한다.
    console.log("Map : ", searchKeyword, "로 변경되었음.")

    // 2.1 장소 검색 객체를 생성
    const ps = new window.kakao.maps.services.Places();

    // 2.2 키워드로 장소를 검색
    ps.keywordSearch(searchKeyword, placesSearchCB);

    // 2.3 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i=0; i<data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 2.4 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    }

    

    // + 기능 3. 서울시 행정구 표시
    // const customOverlay = new kakao.maps.CustomOverlay({});
    // const infowindow = new kakao.maps.InfoWindow({ removable: true });
    
    // let sigunguData = geojson.features;
    // let sanggwonData = sanggwonjson.features;
    // let coordinates = [];
    // let name = '';
    

  //   const displayArea = (coordinates, name) => {
  //     let path = [];
  //     let points = [];
  //     let polygons = [];

  //     coordinates[0].forEach((coordinate) => {
  //       let point = {};

  //       point.x = coordinate[1];
  //       point.y = coordinate[0];
        
  //       points.push(point);
  //       path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
  //     });
    

  //   let polygon = new kakao.maps.Polygon({
  //     map : map,
  //     path: path,
  //     strokeWeight: 2, // 선의 두께입니다
  //     strokeColor: '#004c80', // 선의 색깔입니다
  //     strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
  //     strokeStyle: 'solid', // 선의 스타일입니다
  //     fillColor: '#fff', // 채우기 색깔입니다
  //     fillOpacity: 0.7, // 채우기 불투명도 입니다
  //   });
  //   polygons.push(polygon);
  
  //   // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
  //   // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
  //   kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
  //     polygon.setOptions({ fillColor: '#09f' });

  //     customOverlay.setContent('<div class="area">' + name + '</div>');

  //     customOverlay.setPosition(mouseEvent.latLng);
  //     customOverlay.setMap(map);
  //   });

  //   // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
  //   kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
  //     customOverlay.setPosition(mouseEvent.latLng);
  //   });

  //   // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
  //   // 커스텀 오버레이를 지도에서 제거합니다
  //   kakao.maps.event.addListener(polygon, 'mouseout', function () {
  //     polygon.setOptions({ fillColor: '#fff' });
  //     customOverlay.setMap(null);
  //   });
  // }

  // sigunguData.forEach((val) => {
  //   let coordinates = [];
  //   let name = '';
    
  //   coordinates = val.geometry.coordinates;
  //   name = val.properties.EMD_KOR_NM;
  //   if(displayDivision) {
  //     displayArea(coordinates, name);
  //   }
  // })
  // sanggwonData.forEach((val) => {
  //   let coordinates = [];
  //   let name = '';
  //   coordinates = val.geometry.coordinates;
  //   name = val.properties.TRDAR_CD_N;
  //   if(displaySanggwon) {
  //     displayArea(coordinates, name);
  //   }
  // })

},)
  
      return (
          <div className='Map'>
              
              <div 
                // id="map" 
                style={{width:"100vw", height:"90vh"}}
                ref = {container}
              ></div>
              <p id ="result">asd</p>
              <LeftSide setSearchKeyword={setSearchKeyword}/>
              <RightSide/>
              <button type="submit" onClick={handleDisplay} style={{width:"100vw"}}>행정 구역 보기</button>
              <button type="submit" onClick={handleDisplaySanggwon} style={{width:"100vw"}}>상권 구역 보기</button>
              
          </div>
      )
}
export default Map;