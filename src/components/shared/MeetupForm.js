import { Form, Button, Container } from "react-bootstrap";

export default function MeetupForm(props) {
    const { meetup, handleChange, handleSubmit, heading } = props

    const petTypes = ['Cat', 'Dog', 'Other']
    const options = petTypes.map(option => (
        <option value={option}>{option}</option>
    ))

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
                    <Form.Control 
                        placeholder="Location"
                        id="location"
                        name="location"
                        value={meetup.location}
                        onChange={handleChange}
                    />
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