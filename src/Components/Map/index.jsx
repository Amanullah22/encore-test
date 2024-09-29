import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoordinates, clearCoordinates } from "../../Redux/ApplicationReducer";

const Map = ({ selectedLocation, geocoder, google }) => {
    const mapContainer = useRef(null);
    const dispatch = useDispatch();
    const [map, setGMap] = useState(null);
    const location = useSelector((state) => state.google.coordinates)

    useEffect(() => {
        if (google) {
            initMap(location);
        }
    }, [location, google])

    useEffect(() => {
        if (location && map) {
            new google.maps.Marker({
                position: location,
                map: map,
            })
        }
    }, [location, map])

    useEffect(() => {
        if (selectedLocation && geocoder) {
            dispatch(getCoordinates({
                geocoder,
                placeId: selectedLocation
            }))
        } else {
            if (google) {
                dispatch(clearCoordinates())
                initMap()
            }
        }
    }, [selectedLocation, geocoder, google])

    const initMap = (mapCenter) => {
        const googleMap = new google.maps.Map(mapContainer.current, {
            zoom: 5, minZoom: 2, center: mapCenter ? mapCenter : { lat: 0, lng: 0 }, streetViewControl: false,
            rotateControl: false, scaleControl: true, fullscreenControl: false, panControl: false, zoomControl: true,
            gestureHandling: 'cooperative', draggableCursor: 'pointer',
        })

        if (mapContainer.current) {
            setGMap(googleMap);
        }
    };

    return <div>
        <div ref={mapContainer} className="mapContainer"></div>
    </div>
}

export default Map