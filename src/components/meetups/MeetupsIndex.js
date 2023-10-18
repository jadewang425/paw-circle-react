import { useState, useEffect, useRef } from 'react'
import { getAllMeetups } from '../../api/meetup'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import MeetupSideBar from './MeetupSideBar'
import MeetupMain from './MeetupMain'

export default function MeetupsIndex(props) {
    const [meetups, setMeetups] = useState(null)
    const [error, setError] = useState(false)
    const [activeType, setActiveType] = useState('')

    // const typesRef = useRef([])

    const { msgAlert, petTypes } = props

    useEffect(() => {
        getAllMeetups()
            .then(res => {
                if (activeType === '') {
                    setMeetups(res.data.meetups)
                } else {
                    setMeetups(res.data.meetups.filter(meetup => meetup.type === activeType))
                }
                // typesRef.current = [...new Set(meetups.map(meetup => meetup.type))]
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Meetups',
                    message: messages.indexMeetupFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [activeType])

    if (error) {
        return <LoadingScreen />
    }

    return (
        <main style={{display: 'flex', flexDirection: 'column', margin: '20px', alignItems: 'center'}}>
            <MeetupSideBar 
                style={{display: 'flex'}}
                activeType={activeType}
                setActiveType={setActiveType}
                petTypes={petTypes}
            />
            <MeetupMain 
                meetups={meetups}
                className='container-md'
            />
        </main>
    )
}