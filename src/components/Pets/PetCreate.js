import { useState } from "react";
import { createMeetup } from "../../api/meetup";
import messages from "../shared/AutoDismissAlert/messages";
import { useNavigate } from "react-router-dom";

import MeetupForm from "../shared/MeetupForm";

export default function MeetupCreate (props) {
    const { user, msgAlert, petTypes, MAPBOX_TOKEN } = props
    const navigate = useNavigate()
    const [meetup, setMeetup] = useState({
        title: '',
        date:'',
        type: '',
        description: '',
        location: '',
    })
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
        
        createMeetup(user, meetup) 
            .then(res => { navigate(`/meetups/${res.data.meetup._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Congratulations! A new meetup is created!',
                    message: messages.createMeetupSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error creating meetup.',
                    message: messages.createMeetupFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <MeetupForm 
            user={user}
            meetup={meetup}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add A New Meetup"
            petTypes={petTypes}
            MAPBOX_TOKEN={MAPBOX_TOKEN}
        />
    )
}