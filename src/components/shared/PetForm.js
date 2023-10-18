import { Button, Card, Form } from "react-bootstrap"

export default function PetForm(props) {
    const { pet, handleChange, handleSubmit, heading, petTypes } = props

    const options = petTypes.map(option => (
        <option value={option} key={option}>{option}</option>
    ))

    return (
        <Card className="justify-content-center m-4">
            <Card.Header style={{backgroundColor: 'tan'}}><strong>{heading}</strong></Card.Header>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        placeholder="Pet name"
                        id="name"
                        name="name"
                        value={pet.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                        id="type"
                        name="type"
                        value={pet.type}
                        onChange={handleChange}
                    >
                        {options}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control 
                        type="date"
                        placeholder="Pet's birthday"
                        id="birthday"
                        name="birthday"
                        value={pet.birthday}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>About Pet</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2}
                        placeholder="Details of the pet"
                        id="aboutme"
                        name="aboutme"
                        value={pet.aboutme}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" variant="dark" type="submit">Submit</Button>
            </Form>
        </Card>
    )
}