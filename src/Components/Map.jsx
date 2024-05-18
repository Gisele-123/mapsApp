import react, { useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useState } from "react"
import db from "../Firebase_setup/firebase"
import { getDatabase, ref, onValue } from "firebase/database";
import { Icon } from "@iconify/react/dist/iconify.js";
import { config, configDotenv } from "dotenv";

const libraries = ['places'];
const mapContainerStyle={
    width: '100vw',
    height: '100vh',
};

const center ={
    lat: -1.9489196023037583,
    lng:  30.092607828989397,
}

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon="mdi:location" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );

const Map =()=>{
    const db = getDatabase();
    const {isLoaded, loadError } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

  const [ currentLocation, setCurrentLocation ] = useState([]);

  const fetchdata=async()=>{
    const starCountRef = ref(db,"location/");
    onValue(starCountRef, (snapshot)=>{
        const data = snapshot.val();
        setCurrentLocation(data);
        console.log(data);
    });
  };

  useEffect(()=>{
    fetchdata();
  }, [])

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;
    return  (
       <div>
         <h2 className="map-h2">Come Visit Us At Our Kigali</h2>
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
    // bootstrapURLKeys={{ key: 'AIzaSyDcEMUJb_jK28eKG7xzhm2XSkHshQgCtqk' }}
>
    {currentLocation ? (
        currentLocation.map((loc, index) => (
            <Marker
                key={index}
                position={{ lat: loc.lat, lng: loc.lng }}
            >
                <LocationPin text={loc.address} />
            </Marker>
        ))
    ) : null}
</GoogleMap>

       </div> 
    )
}

export default Map;