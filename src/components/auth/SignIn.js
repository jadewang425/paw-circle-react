import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import { Button, Card, Form } from 'react-bootstrap'

export default function SignIn (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
        // console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {username, password}

		signIn(credentials)
			.then((res) => {
                setUser(res.data.user)
                const userJSON = JSON.stringify(res.data.user)
                localStorage.setItem('user', userJSON)
            })
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setUsername('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <Card className='col-sm-10 col-md-8 mx-auto mt-5' style={{padding: '0'}}>
                <Card.Header style={{backgroundColor: 'tan'}}>Sign In</Card.Header>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='username'>
                        <Form.Label className='m-2'>Username</Form.Label>
                        <Form.Control
                            required
                            type='username'
                            name='username'
                            value={username}
                            placeholder='Enter username'
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label className='m-2'>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='dark' type='submit' className='m-2'>
                        Submit
                    </Button>
                </Form>
            </Card>
        </div>
    )
}