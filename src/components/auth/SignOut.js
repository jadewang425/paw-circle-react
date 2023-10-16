import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup, Card} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    console.log(props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row'>
                <Card className='col-sm-10 col-md-8 mx-auto mt-5' style={{padding: '0'}}>
                    <Card.Header style={{backgroundColor: 'tan'}}>Are you sure you want to sign out?</Card.Header>
                    <Card.Body>
                        <small>We hate to see you go...</small><br/>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant='danger' onClick={onSignOut} className='m-2'>
                            Sign Out
                        </Button>
                        <Button variant='warning' onClick={onCancel} className='m-2'>
                            Cancel
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
		</>
	)
}

export default SignOut
