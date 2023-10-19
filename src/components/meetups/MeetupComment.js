import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { addComment } from "../../api/comment"
import messages from "../shared/AutoDismissAlert/messages"

export default function MeetupComment(props) {
    const { meetup, user, msgAlert, triggerRefresh } = props
    const [comment, setComment] = useState({comment: ''})

    const onChange = (e) => {
        e.persist()
        setComment({comment: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addComment(user, meetup._id, comment)
            .then(() => {
                msgAlert({
                    heading: 'Comment added!',
                    message: messages.addCommentSuccess,
                    variant: 'success'
                })
            })
            .then(() => setComment({comment: ''}))
            .then(() => triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Error adding comment.',
                    message: messages.addCommentFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Add A Comment</Form.Label>
                    <Form.Control 
                        placeholder="Share your thoughts!"
                        id="comment"
                        name="comment"
                        value={comment.comment}
                        onChange={onChange}
                    />
                </Form.Group>
                <Button className="m-2" variant="dark" type="submit">Add</Button>
            </Form>
        </>
    )
}