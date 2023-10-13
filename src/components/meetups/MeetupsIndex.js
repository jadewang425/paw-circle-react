import dateFormat from 'dateformat'
import { useState, useEffect } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getAllMeetups } from '../../api/meetup'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

export default function MeetupsIndex(props) {
    const [meetups, setMeetups] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props
    const cardContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
    }

    useEffect(() => {
        getAllMeetups()
            .then(res => {
                // console.log('meetups?', res.data.meetups)
                setMeetups(res.data.meetups)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Meetups',
                    message: messages.indexMeetupFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    if (error) {
        return <LoadingScreen />
    } 
    if (!meetups) {
        return <LoadingScreen />
    } else if (meetups.length === 0) {
        return <p>No Meetups scheduled at the moment.</p>
    }
    // console.log('meetups', meetups)

    const meetupCards = meetups.map(meetup => {
        const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
        return (
            <Link to={`/meetups/${meetup._id}`} key={ meetup._id } className='pc-cards'>
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
        <main style={{display: 'flex', margin: '20px'}} >
            <Container style={{width: '18rem'}} >
                <Link to={'/meetups/create'}>
                    <Button>Create Meetup</Button>
                </Link>
            </Container>
            <Container className='container-md' style={cardContainer}>
                { meetupCards }
            </Container>
        </main>
    )
}