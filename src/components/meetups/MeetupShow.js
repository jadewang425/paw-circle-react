import dateFormat from 'dateformat'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { getOneMeetup } from "../../api/meetup";
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen";
import EditMeetupModal from './EditModal';
import DeleteMeetupModal from './DeleteModal';

export default function MeetupShow(props) {
    const [meetup, setMeetup] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { user, msgAlert, petTypes, MAPBOX_TOKEN } = props
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
    }, [updated])

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
                            Description: {meetup.description}<br/>
                            { meetup.owner ? 
                            `Created By ${meetup.owner.username}`
                            :null }
                        </Card.Text>
                    </Card.Body>
                    { meetup.owner && user && meetup.owner._id === user._id ? 
                        <><Card.Footer>
                            <Button className='mx-2' variant="warning" onClick={() => setEditModalShow(true)}>Edit</Button>
                            <Button className='mx-2' variant="danger" onClick={() => setDeleteModalShow(true)}>Delete</Button>
                        </Card.Footer></>
                    :null
                    }
                    
                </Card>
            </Container>
            <EditMeetupModal 
                user={user}
                show={editModalShow}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                meetup={meetup}
                petTypes={petTypes}
                MAPBOX_TOKEN={MAPBOX_TOKEN}
            />
            <DeleteMeetupModal 
                user={user}
                show={deleteModalShow}
                msgAlert={msgAlert}
                handleClose={() => setDeleteModalShow(false)}
                triggerRefresh={() => setUpdated(prev => !prev)}
                meetup={meetup}
            />
        </>
    )
}