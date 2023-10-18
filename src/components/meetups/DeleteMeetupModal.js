import dateFormat from 'dateformat'
import { Modal, Button } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import { deleteMeetup } from '../../api/meetup'
import { useNavigate } from 'react-router-dom'

export default function DeleteMeetupModal(props) {
    const { user, meetup, show, handleClose, msgAlert } = props
    const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
    const navigate = useNavigate()

    const removeMeetup = () => {
        deleteMeetup(user, meetup._id)
            .then(() => {
                msgAlert({
                    heading: 'Successfully removed the meetup!',
                    message: messages.deleteMeetupSuccess,
                    variant: 'success'
                })
            })
            .then(() => navigate('/meetups'))
            .catch(() => {
                msgAlert({
                    heading: 'Something went wrong, cannot remove this meetup.',
                    message: messages.deleteMeetupFailure,
                    variant: 'danger'
                })
            })
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <div>Are you sure you want to delete this meetup?</div>
                <div><strong>{meetup.title}</strong></div>
                <div>{meetupDate}</div>
                <Button 
                    className="m-2" variant="danger" 
                    onClick={() => removeMeetup()}
                >
                    Confirm
                </Button>
            </Modal.Body>
        </Modal>
    )
}