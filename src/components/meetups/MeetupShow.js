import dateFormat from 'dateformat'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

import { getOneMeetup } from "../../api/meetup";

import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen";

export default function MeetupShow(props) {
    const [meetup, setMeetup] = useState(null)

    const { id } = useParams()
    const { user, msgAlert } = props
    useEffect(() => {
        getOneMeetup(id)
            .then(res => setMeetup(res.data.meetup))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting meetup',
                    message: messages.showMeetupFailure,
                    variant: 'danger'
                })
            })
    }, [])
    if (!meetup) {
        return <LoadingScreen />
    } 

    const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{meetup.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Date: {meetupDate}<br/>
                            Type: {meetup.type}<br/>
                            Location: {meetup.location}<br/>
                            Description: {meetup.description}
                        </Card.Text>
                    </Card.Body>
                    {/* <Card.Footer>Created By</Card.Footer> */}
                </Card>
            </Container>
        </>
    )
}