import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MeetupForm from '../shared/MeetupForm'
import messages from '../shared/AutoDismissAlert/messages'

export default function EditMeetupModal(props) {
    const { user, show, handleClose, meetup, updateMeetup } = props
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <MeetupForm 
                    meetup={meetup}
                    handleChange={null}
                    handleSubmit={null}
                    heading="Update meetup"
                />
            </Modal.Body>
        </Modal>
    )
} 