import dateFormat from "dateformat"
import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoadingScreen from "../shared/LoadingScreen"

export default function PetsIndexMain(props) {
    const { pets } = props
    if (!pets) {
        return <LoadingScreen />
    } else if (pets.length === 0) {
        return <Container><p>No Pets added.</p></Container>
    }
    const petCards = pets.map(pet => {
        // const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
        return (
            <Link to={`/pets/${pet._id}`} key={ pet._id } style={{textDecoration: 'none'}}>
                <Card id="cards" style={{ width: '18rem', height: '12rem'}}>
                    <Card.Header className="text-white" style={{backgroundColor: 'tan'}}>
                        <strong>{pet.name}</strong>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Type: {pet.type}</small><br/>
                            <small>Location: {pet.age}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        )
    })
    return (
        <Container className="card-container">
            {petCards}    
        </Container>
    )
}