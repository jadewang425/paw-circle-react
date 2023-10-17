import { Container } from 'react-bootstrap'
import { AddressAutofill, AddressMinimap, useConfirmAddress, config } from '@mapbox/search-js-react';

export default function MeetupMinimap(props) {
    
    const { MAPBOX_TOKEN } = props
    return (
        <Container style={{height: '50vh', width: '50vh', backgroundColor: 'red'}}>
            <h1>Minimap</h1>
            <AddressMinimap
                accessToken={MAPBOX_TOKEN}
                // canAdjustMarker={true}
                // satelliteToggle={true}
                // feature={feature}
                // show={true}
                // onSaveMarkerLocation={handleSaveMarkerLocation}
            />
        </Container>
    )
}