import { Form, Button, Container } from "react-bootstrap"
import MapboxAutocomplete from "react-mapbox-autocomplete"

export default function MeetupForm(props) {
    const { user, meetup, handleChange, handleSubmit, heading, petTypes, MAPBOX_TOKEN } = props

    const options = petTypes.map(option => (
        <option value={option} key={option}>{option}</option>
    ))

    // const mapboxApiAccessToken=
    // "pk.eyJ1Ijoiam9uc2VuIiwiYSI6IkR6UU9oMDQifQ.dymRIgqv-UV6oz0-HCFx1w"
    
    // console.log('.env', process.env.REACT_APP_MAPBOX_TOKEN)

    function _suggestionSelect(result, lat, long, text) {
        console.log(result, lat, long, text);
        meetup.location = result;
    }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        placeholder="Event title"
                        id="title"
                        name="title"
                        value={meetup.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        type="datetime-local"
                        placeholder="Event date"
                        id="date"
                        name="date"
                        value={meetup.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                        id="type"
                        name="type"
                        value={meetup.type}
                        onChange={handleChange}
                    >
                        {options}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Location</Form.Label>
                    <MapboxAutocomplete
                        publicKey={MAPBOX_TOKEN}
                        inputClass="form-control search"
                        onSuggestionSelect={_suggestionSelect}
                        country="us"
                        placeholder="Location"
                        id="location"
                        name="location"
                        value={meetup.location}
                        onChange={handleChange}
                    >
                    </MapboxAutocomplete>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2}
                        placeholder="Details of the event"
                        id="description"
                        name="description"
                        value={meetup.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}