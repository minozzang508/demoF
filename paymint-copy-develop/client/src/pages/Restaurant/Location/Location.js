import React, { Component } from 'react';

/*global naver*/
class Location extends Component{

    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;
        // script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APPKEY&autoload=false";
        script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=h51y2kk9yc";
        document.head.appendChild(script); // head에 script를 add 

        // script.onload = () => {
        //     kakao.maps.load(() => {
        //         let el = document.getElementById('map');
        //         let map = new kakao.maps.Map(el, {
        //             center: new kakao.maps.Coords(523951.25, 1085073.75)
        //         });
        //     });
        // };
        script.onload = () => {
            const mapOptions ={
                center: new naver.maps.LatLng(37.3595704, 127.105399),
                zoom: 10
            };
            const map = new naver.maps.Map('map',mapOptions);
            // eslint-disable-next-line no-unused-vars
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(37.3595704, 127.105399),
                map: map
            });
        }
    }

    render(){
        return (
            <div id="map" style={{width:"100%",height:"400px"}}></div>

        )
    }
}

export default Location;


// Component Did Mount안에다가 