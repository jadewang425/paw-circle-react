import dateFormat from 'dateformat'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MeetupForm from '../shared/MeetupForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateMeetup } from '../../api/meetup'

export default function EditMeetupModal(props) {
    const { user, show, handleClose, msgAlert, triggerRefresh, petTypes } = props
    // function formattedDate (d) {
    //     return dateFormat(d, 'yyyy-mm-dd')+"T"+dateFormat(d, 'HH:MM')
    // }
    const [meetup, setMeetup] = useState(props.meetup)
    
    const onChange = (e) => {
        e.persist()

        setMeetup(prevMeetup => {
            const updatedName = e.target.name
            const updatedValue = e.target.value
            const updatedMeetup = {[updatedName]: updatedValue}
            
            return {
                ...prevMeetup, ...updatedMeetup
            }

        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateMeetup(user, meetup)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Update success!',
                    message: messages.updateMeetupSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Update failed.',
                    message: messages.updateMeetupFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MeetupForm 
                    meetup={meetup}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update meetup"
                    petTypes={petTypes}
                />
            </Modal.Body>
        </Modal>
    )
} 