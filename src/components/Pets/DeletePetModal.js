import { Modal, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import { removePet } from '../../api/pet'
import { useNavigate } from 'react-router-dom'

export default function DeletePetModal(props) {
    const { user, pet, show, handleClose, msgAlert } = props
    const navigate = useNavigate()

    const archivePet = () => {
        removePet(user, pet._id)
            .then(() => {
                msgAlert({
                    heading: 'Successfully removed the pet',
                    message: messages.deletePetSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/pets'))
            .catch(() => {
                msgAlert({
                    heading: 'Something went wrong, cannot remove this pet.',
                    message: messages.deletePetFailure,
                    variant: 'danger'
                })
            })
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <div>Are you sure you want to remove this pet?</div>
                <div><strong>{pet.name}</strong></div>
                <div>{pet.age}</div>
                <Button 
                    className="m-2" variant="danger" 
                    onClick={() => archivePet()}
                >
                    Confirm
                </Button>
            </Modal.Body>
        </Modal>
    )
}