import React, { useState, useEffect, useRef } from 'react';

const MapView = ({ boardingNear }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const loadedMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 53.3555, lng: -4.1743 },
      zoom: 6,
    });

    setMap(loadedMap);
    setGeocoder(new window.google.maps.Geocoder());
  }, []);

  useEffect(() => {
    if (geocoder && boardingNear && map) {
      geocoder.geocode({ address: boardingNear }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(14); 

          if (!marker) {
            const newMarker = new window.google.maps.Marker({
              map: map,
              position: location
            });
            setMarker(newMarker);
          } else {
            marker.setPosition(location);
          }
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }, [geocoder, boardingNear, map, marker]);

  return <div ref={mapRef} style={{ height: '600px', width: '100%' }} />; // Adjust the height here
};

export default MapView;
