import dateFormat from "dateformat"
import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import LoadingScreen from "../shared/LoadingScreen"

export default function MeetupMain(props) {
    const { meetups } = props
    if (!meetups) {
        return <LoadingScreen />
    } else if (meetups.length === 0) {
        return <Container><p>No Meetups scheduled at the moment.</p></Container>
    }
    const meetupCards = meetups.map(meetup => {
        const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
        return (
            <Link to={`/meetups/${meetup._id}`} key={ meetup._id } style={{textDecoration: 'none'}}>
                <Card id="cards" style={{ width: '18rem', height: '15rem'}}>
                    <Card.Header className="text-white" style={{backgroundColor: 'tan'}}>
                        <strong>{meetup.title}</strong>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>{meetupDate}</small><br/>
                            <small>Type: {meetup.type}</small><br/>
                            <small>Location: <br/> {meetup.location[0]}</small>
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