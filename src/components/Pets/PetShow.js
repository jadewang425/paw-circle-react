import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { getOnePet } from '../../api/pet'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from "../shared/LoadingScreen";
import EditPetModal from "./EditPetModal";
import DeletePetModal from "./DeletePetModal";

export default function PetShow(props) {
    const { id } = useParams()
    const { user, msgAlert, petTypes } = props
    
    const [pet, setPet] = useState(null)
    const [editPetModalShow, setEditPetModalShow] = useState(false)
    const [deletePetModalShow, setDeletePetModalShow] = useState(false)
    const [updatedPet, setUpdatedPet] = useState(false)

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

    return (
        <>
            <Container>
                <Card className='m-2'>
                    <Card.Header>{pet.name}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Type: {pet.type}<br/>
                            Age: {pet.age}<br/>
                            About me: {pet.aboutme}<br/>
                            { pet.owner ? 
                            <div>
                                Pawrent: <Link to={`/pawrent/${pet.owner._id}`}>{pet.owner.username}</Link>
                            </div>
                            :null }
                        </Card.Text>
                    </Card.Body>
                    { pet.owner && user && pet.owner._id === user._id ? 
                        <><Card.Footer>
                            <Button className='mx-2' variant="warning" onClick={() => setEditPetModalShow(true)}>Edit</Button>
                            <Button className='mx-2' variant="danger" onClick={() => setDeletePetModalShow(true)}>Delete</Button>
                        </Card.Footer></>
                    :null
                    }
                </Card>
            </Container>
            <EditPetModal 
                user={user}
                show={editPetModalShow}
                msgAlert={msgAlert}
                handleClose={() => setEditPetModalShow(false)}
                triggerRefresh={() => setUpdatedPet(prev => !prev)}
                pet={pet}
                petTypes={petTypes}
            />
            <DeletePetModal 
                user={user}
                show={deletePetModalShow}
                msgAlert={msgAlert}
                handleClose={() => setDeletePetModalShow(false)}
                triggerRefresh={() => setUpdatedPet(prev => !prev)}
                pet={pet}
            />
        </>
    )
}