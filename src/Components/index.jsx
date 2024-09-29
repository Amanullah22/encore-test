import React, { useState, useEffect } from "react";
import ReactDependentScript from 'react-dependent-script';
import SearchBar from "./Search";
import Map from "./Map";
import { useDispatch, useSelector } from "react-redux";
import { getPredictions, clearPredictions } from "../Redux/ApplicationReducer";
import './index.css'

const MainComponent = () => {
    const [search, setSearch] = useState('')
    //const [suggestions, setSuggestions] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const [autocompleteService, setAutocompleteService] = useState(null)
    const [geocoder, setGeocoder] = useState(null)
    const dispatch = useDispatch();
    const suggestions = useSelector((state) => state.google.predictions)
    const google = window.google;

    useEffect(() => {
        if(google) {
            const autoComplete = new google.maps.places.AutocompleteService()
            const geocoder = new google.maps.Geocoder()
            setAutocompleteService(autoComplete)
            setGeocoder(geocoder)
        }
    }, [google])

    useEffect(() => {
        if (search.length && autocompleteService) {
            dispatch(getPredictions({
                autocompleteService,
                search
            }))
        } else {
            dispatch(clearPredictions())
            setSelectedId(null)
        }
    }, [search, autocompleteService])

    const initializeGooglePlaces = () => {
        return <div className="mainContainer">
            <SearchBar selectedId={setSelectedId} suggestions={suggestions} search={search} setSearch={setSearch} />
            <Map google={google} selectedLocation={selectedId} geocoder={geocoder} />
        </div>
    }

    return <ReactDependentScript
        loadingComponent={<div>Loading Google Maps script</div>}
        scripts={[`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`]}
    >
        {initializeGooglePlaces()}
    </ReactDependentScript>
}

export default MainComponent