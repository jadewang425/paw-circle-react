import { useState } from "react";
import { createPet } from "../../api/pet";
import messages from "../shared/AutoDismissAlert/messages";
import { useNavigate } from "react-router-dom";
import PetForm from "../shared/PetForm";

export default function PetCreate (props) {
    const { user, msgAlert, petTypes } = props
    const navigate = useNavigate()
    const [pet, setPet] = useState({
        name: '',
        type: '',
        birthday: '',
        aboutme: '',
    })
    const onChange = (e) => {
        e.persist()

        setPet(prevPet => {
            const updatedName = e.target.name
            const updatedValue = e.target.value
            const updatedPet = {[updatedName]: updatedValue}
            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        createPet(user, pet) 
            .then(res => { navigate(`/pets/${res.data.pet._id}`)})
            .then(() => {
                msgAlert({
                    heading: 'Congratulations! A new pet is added!',
                    message: messages.createPetSuccess,
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error creating the pet.',
                    message: messages.createPetFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <PetForm 
            user={user}
            pet={pet}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add A Pet"
            petTypes={petTypes}
        />
    )
}