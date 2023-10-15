import dateFormat from "dateformat"
import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function MeetupMain(props) {
    const { meetups } = props
    const meetupCards = meetups.map(meetup => {
        const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
        return (
            <Link to={`/meetups/${meetup._id}`} key={ meetup._id } style={{textDecoration: 'none'}}>
                <Card style={{ width: '18rem' }}>
                    <Card.Header>{meetup.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Date: {meetupDate}</small><br/>
                            <small>Type: {meetup.type}</small><br/>
                            <small>Location: {meetup.location}</small>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        )
})
    return (
        <Container className="card-container">
            {meetupCards}    
        </Container>
    )
}