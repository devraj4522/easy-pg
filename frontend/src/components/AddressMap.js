import React from 'react';
// import ReactMapboxGl from 'react-mapbox-gl';

// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw',
// });

const AddressMap = (props) => {
  const leftMargin = props.sideBarVis ? '15vw' : '0';
  console.log(props.sideBarVis);

  return (
    <div className="map-container">
      {/* <Map
        antialias={true}
        containerStyle={{
          height: '430px',
          width: '50%',
          position: 'absolute',
          right: '-40px',
          top: '-113px',
          transition: '.5s',
          overflow: 'hidden',
          borderRadius: '10px',
          objectFit: 'cover',
          outline: 'none',
        }}
        center={[-117.06651266267949, 32.76570649214452]}
        flyToOptions={{
          speed: 2,
        }}
        onClick={props.mapClick}
        onStyleLoad={props.mapLoad}
        pitch={[60]}
        style="mapbox://styles/mapbox/streets-v11"
        zoom={[16]}
      ></Map> */}
    </div>
  );
};

export default AddressMap;
