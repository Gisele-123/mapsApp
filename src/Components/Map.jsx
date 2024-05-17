import react, { useEffect } from "react"
import { GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import { useState } from "react"
import db from "../Firebase_setup/firebase"
import { getDatabase, ref, onValue } from "firebase/database";


const libraries = ['places'];
const mapContainerStyle={
    width: '100vw',
    height: '100vh',
};

const center ={
    lat: 1.9403,
    lng: 29.8739,
}

const Map =()=>{
    const db = getDatabase();
    const {isLoaded, loadError } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: 'AIzaSyDcEMUJb_jK28eKG7xzhm2XSkHshQgCtqk',
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