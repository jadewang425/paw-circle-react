import Map, { Marker } from 'react-map-gl';
import { Container } from 'react-bootstrap'

export default function MeetupMinimap(props) {
    const { meetup, MAPBOX_TOKEN } = props
    
    const location = {
        latitude: meetup.location[1],
        longitude: meetup.location[2],
        zoom: 14,
    }

    return (
        <Container>
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={location}
                style={{width: 400, height: 400, borderRadius: 10}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker
                    latitude={location.latitude}
                    longitude={location.longitude}
                    color='red'
                    anchor="bottom"
                 />
            </Map>
        </Container>
    )
}