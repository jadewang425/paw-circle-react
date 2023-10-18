import dateFormat from 'dateformat'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updatePet } from '../../api/pet'

export default function EditPetModal(props) {
    const { user, show, handleClose, msgAlert, triggerRefresh, petTypes } = props
    // function formattedDate (d) {
    //     return dateFormat(d, 'yyyy-mm-dd')+"T"+dateFormat(d, 'HH:MM')
    // }
    const [pet, setPet] = useState(props.pet)

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
        updatePet(user, pet)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Update success!',
                    message: messages.updatePetSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Update failed.',
                    message: messages.updatePetFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <PetForm 
                    user={user}
                    pet={pet}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Pet"
                    petTypes={petTypes}
                />
            </Modal.Body>
        </Modal>
    )
} 