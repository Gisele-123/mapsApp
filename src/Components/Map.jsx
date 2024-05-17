import react from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useState } from "react"

const libraries = ['places'];
const mapContainerStyle={
    width: '100vw',
    height: '100vh',
};

const center ={
    lat: 2,
    lng: 30,
}

const Map =()=>{
    const {isLoaded, loadError } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyDcEMUJb_jK28eKG7xzhm2XSkHshQgCtqk',
        libraries,
    });

  
    return isLoaded ? (
       <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={{
                zoomControl: true,
                streetViewControl: true,
                mapTypeControl: true,
                fullscreenControl: true,
            }}
        >
            <Marker position={center}/>
        </GoogleMap>
       </div> 
    ):(
        <div>
            Error loading map
        </div>
    )
}

export default Map;