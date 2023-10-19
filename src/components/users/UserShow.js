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
    const dateJoined = dateFormat(pawrent.createdAt, "yyyy-mm-dd")

    if (!pawrent) {
        return <LoadingScreen />
    }

    return (
        <Card>
            <Card.Title>Pawrent Profile</Card.Title>
            <Card.Text>
                {pawrent.username}<br/>
                {pawrent.about}<br/>
                Date Joined: {dateJoined}<br/>
            </Card.Text>
        </Card>
    )
}