import dateFormat from 'dateformat'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { getOnePet } from '../../api/pet'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen";
// import EditPetModal from './EditPetModal';
// import DeletePetModal from './DeletePetModal';

export default function PetShow(props) {
    const [pet, setPet] = useState(null)
    const [editPetModalShow, setEditPetModalShow] = useState(false)
    const [deletePetModalShow, setDeletePetModalShow] = useState(false)
    const [updatedPet, setUpdatedPet] = useState(false)

    const { id } = useParams()
    const { user, msgAlert, petTypes } = props
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pet',
                    message: messages.showPetFailure,
                    variant: 'danger'
                })
            })
    }, [updatedPet])

    if (!pet) {
        return <LoadingScreen />
    } 

    // const meetupDate = dateFormat(meetup.date, "yyyy-mm-dd • h:MM TT")
    return (
        <>
            <Container>
                <Card className='m-2'>
                    <Card.Header>{pet.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Type: {pet.type}<br/>
                            Age: {pet.age}<br/>
                            { pet.owner ? 
                            `Created By ${pet.owner.username}`
                            :null }
                        </Card.Text>
                    </Card.Body>
                    {/* { pet.owner && user && pet.owner._id === user._id ? 
                        <><Card.Footer>
                            <Button className='mx-2' variant="warning" onClick={() => setEditPetModalShow(true)}>Edit</Button>
                            <Button className='mx-2' variant="danger" onClick={() => setDeletePetModalShow(true)}>Delete</Button>
                        </Card.Footer></>
                    :null
                    } */}
                </Card>
            </Container>
            <EditMeetupModal 
                user={user}
                show={editPetModalShow}
                msgAlert={msgAlert}
                handleClose={() => setEditPetModalShow(false)}
                triggerRefresh={() => setUpdatedPet(prev => !prev)}
                meetup={meetup}
                petTypes={petTypes}
            />
            <DeleteMeetupModal 
                user={user}
                show={deletePetModalShow}
                msgAlert={msgAlert}
                handleClose={() => setDeletePetModalShow(false)}
                triggerRefresh={() => setUpdatedPet(prev => !prev)}
                meetup={meetup}
            />
        </>
    )
}