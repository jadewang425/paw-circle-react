import { useState } from "react";
import { createMeetup } from "../../api/meetup";
import messages from "../shared/AutoDismissAlert/messages";
import { useNavigate } from "react-router-dom";

import MeetupForm from "../shared/MeetupForm";

// pass props  meetup, handleChange, handleSubmit, heading

export default function MeetupCreate (props) {
    const { user, msgAlert } = props
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

            // if data type is number
            // if (e.target.type === 'number') {
            //     updatedValue = parseInt(e.target.value)
            // }

            // if data type is boolean/checkbox in the form
            // if (updatedName === 'adoptable' && e.target.checked) {
            //     updatedValue = true
            // } else if (updatedName === 'adoptable' && !e.target.checked) {
            //     updatedValue = false
            // }

            const updatedMeetup = {[updatedName]: updatedValue}
            
            return {
                ...prevMeetup, ...updatedMeetup
            }

        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        createMeetup(user, meetup) 
            .then(res => { navigate(`/meetups/${res.data.meetup.id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Congratulations! A new meetup is created!',
                    message: messages.createMeetupSuccess,
                    variant: 'danger'
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
            meetup={meetup}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="add a new meetup"
        />
    )
}