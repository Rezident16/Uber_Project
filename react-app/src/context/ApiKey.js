import React from "react";
import { useContext } from "react";
const GoogleMapsApiKeyContext = React.createContext();

function MapsProvider ({children}) {
    const script = document.createElement('script');
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    console.log(apiKey)
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    document.head.append(script);
    return (
        <GoogleMapsApiKeyContext.Provider value={apiKey}>
            {children}
        </GoogleMapsApiKeyContext.Provider>
    )
}

export const useApiKey = () => useContext(GoogleMapsApiKeyContext);

export default MapsProvider;
