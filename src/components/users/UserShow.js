import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneUser } from '../../api/user'
import messages from '../shared/AutoDismissAlert/messages'
import { Container, Card, Button } from "react-bootstrap";
import LoadingScreen from "../shared/LoadingScreen";
import dateFormat from "dateformat";

export default function UserShow(props) {
    const { id } = useParams()
    const { user, msgAlert } = props

    const [pawrent, setPawrent] = useState(null)
    // const [updatePawrent, setUpdatePawrent] = useState(false)

    useEffect(() => {
        getOneUser(user, id)
            .then(res => {
                setPawrent(res.data.user)})
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pawrent',
                    message: messages.showUserFailure,
                    variant: 'danger'
                })
            })
    }, [])

    if (!pawrent) {
        return <LoadingScreen />
    }

    return (
        <Container>
            <Card className="m-2">
                <Card.Header>Pawrent Profile</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {pawrent.username}<br/>
                        {pawrent.about}<br/>
                        Date Joined: {dateFormat(pawrent.createdAt, "yyyy-mm-dd")}<br/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}