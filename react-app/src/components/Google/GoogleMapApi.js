import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useApiKey } from "../../context/ApiKey";
import './map.css'


const GoogleMap = ({ restaurant }) => {
    
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [restaurantLocation, setRestaurantLocation] = useState(null);

  const apiKey = useApiKey();

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      getLocation();
    });
  }, [apiKey, map]);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function successCallback(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    setUserLocation({ lat, lng });

    if (!map) {
      // Initialize the map if it hasn't been initialized yet
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat, lng },
          zoom: 15,
        }
      );

      setMap(mapInstance);

      // Add a marker for the user's location

      const userMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance,
        title: "Your Location",
        icon: 'http://maps.gstatic.com/mapfiles/ms2/micons/man.png'
      });
      console.log(userMarker);

      // Geocode the restaurant's address and add a marker
      const geocoder = new window.google.maps.Geocoder();
      const restaurantAddress = `${restaurant.address}, ${restaurant.city}, ${restaurant.state}`;

      geocoder.geocode({ address: restaurantAddress }, (results, status) => {
        if (status === "OK") {
          const restaurantLocation = results[0].geometry.location;

          setRestaurantLocation(restaurantLocation);

          const restaurantMarker = new window.google.maps.Marker({
            position: restaurantLocation,
            map: mapInstance,
            title: restaurant.name || "Restaurant",
          });
        }
      });
    } else {
      map.setCenter({ lat, lng });
    }
  }

  function errorCallback(error) {
    console.error(`Geolocation error: ${error.message}`);
  }

  return <div id="map"/>;
//   return null
};

export default GoogleMap;
