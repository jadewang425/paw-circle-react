import dateFormat from 'dateformat'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { getOneMeetup } from "../../api/meetup";
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen";
import EditMeetupModal from './EditMeetupModal';
import DeleteMeetupModal from './DeleteMeetupModal';
import MeetupMinimap from './MeetupMinimap';
import MeetupComment from './MeetupComment';

export default function MeetupShow(props) {
    const [meetup, setMeetup] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const { user, msgAlert, petTypes, MAPBOX_TOKEN } = props

    useEffect(() => {
        getOneMeetup(id)
            .then(res => {
                setMeetup(res.data.meetup)})
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

    const meetupComments = meetup.comments === 0 ? <ListGroup.Item>'No comments yet'</ListGroup.Item> : meetup.comments.map(comment => (
        <ListGroup.Item key={comment._id}>{comment.owner.username}<br/> {comment.comment}<br/> <small>{dateFormat(comment.createdAt, "yyyy-mm-dd")}</small></ListGroup.Item>))

    return (
        <>
            <Container>
                <Card className='m-2'>
                    <Card.Header>{meetup.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Date: {dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")}<br/>
                            Type: {meetup.type}<br/>
                            Location: {meetup.location}<br/>
                            Description: {meetup.description}<br/>
                            { meetup.owner ? 
                                <>
                                    Created by <Link to={`/pawrent/${meetup.owner._id}`}>{meetup.owner.username}</Link>
                                </>
                                :null 
                            }
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
                <MeetupComment 
                    user={user}
                    meetup={meetup}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
                <Card className='m-2'>
                    <Card.Header>Comments</Card.Header>
                    <ListGroup variant="flush">
                        {meetupComments}
                    </ListGroup>
                </Card>
                {/* <MeetupMinimap MAPBOX_TOKEN={MAPBOX_TOKEN} /> */}
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