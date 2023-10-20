import Map, { Marker } from 'react-map-gl';
import { Container } from 'react-bootstrap'
import { useState } from 'react';

export default function MeetupMinimap(props) {
    const { meetup, MAPBOX_TOKEN } = props

    const location = {
        latitude: meetup.location[1],
        longitude: meetup.location[2],
        zoom: 14,
    }

    return (
        <Container className="m-2" style={{width: '50vh', height: '50vh'}}>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={location}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={meetup.location[1]}
                    longitude={meetup.location[2]}
                >
                    <div className="marker temporary-marker"><span></span></div>
                </Marker>
            </Map>
        </Container>
    )
}