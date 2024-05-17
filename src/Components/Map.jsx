import react from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useState } from "react"

const libraries = ['places'];
const mapContainerStyle={
    width: '100vw',
    height: '100vh',
};

const center ={
    lat: 7.2905715,
    lng: 80.6337262,
}

const Map =()=>{
    const {isLoaded, loadError } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyDcEMUJb_jK28eKG7xzhm2XSkHshQgCtqk',
        libraries,
    });

    if(loadError){
        <div>Error loading maps</div>
    }
    if(!loadError){
        return <div>Loading maps</div>
    }
    return(
       <div>
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >
            <Marker position={center}/>
        </GoogleMap>
       </div> 
    )
}

export default Map;