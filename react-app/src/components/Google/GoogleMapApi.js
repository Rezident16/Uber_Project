import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useApiKey } from "../../context/ApiKey";


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
  }, [apiKey]);

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
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);

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
      });
      console.log(userMarker);

      // Geocode the restaurant's address and add a marker
      const geocoder = new window.google.maps.Geocoder();
      const restaurantAddress = `${restaurant.address}, ${restaurant.city}, ${restaurant.state}`;

      geocoder.geocode({ address: restaurantAddress }, (results, status) => {
        if (status === "OK") {
          const restaurantLocation = results[0].geometry.location;

          // Set the restaurant location state for later use
          setRestaurantLocation(restaurantLocation);

          // Add a marker for the restaurant location
          const restaurantMarker = new window.google.maps.Marker({
            position: restaurantLocation,
            map: mapInstance,
            title: restaurant.name || "Restaurant",
          });
          console.log(restaurantMarker);
        } else {
          console.error(`Geocoding failed for restaurant: ${status}`);
        }
      });
    } else {
      // Update the map center if it has already been initialized
      map.setCenter({ lat, lng });

      // Update the marker position for the user's location
      // For example, userMarker.setPosition({ lat, lng });

      // If the restaurant location is available, update the marker position
      if (restaurantLocation) {
        // Update the marker position for the restaurant
        // For example, restaurantMarker.setPosition(restaurantLocation);
      }
    }
  }

  function errorCallback(error) {
    console.error(`Geolocation error: ${error.message}`);
  }

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
};

export default GoogleMap;
