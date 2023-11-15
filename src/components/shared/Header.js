import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logos/logo_white.png'

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
	margin: '10px',
	padding: '0.5rem'
}
const authenticatedOptions = (
	<>
		<Nav.Item>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item>
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/meetups' style={linkStyle}>
				Meetups
			</Link>
		</Nav.Item>
		<Nav.Item>
			<Link to='/pets' style={linkStyle}>
				Pets
			</Link>
		</Nav.Item>
	</>
)

export default function Header ({ user }) {
	return (
		<Navbar expand='md' style={{ backgroundColor: 'tan'}}>
			<Navbar.Brand>
				<div>
					<Link to='/' style={linkStyle}>
						<img src={Logo} style={{width: '40px'}}></img>
					</Link>
				</div>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav' style={{justifyContent: 'flex-end'}}>
				<Nav className='ml-auto' style={{ alignItems: 'center' }}>
					{user && (
						<span className='navbar-text'>Welcome, {user.username}</span>
					)}
					{alwaysOptions}
					{user ? authenticatedOptions : unauthenticatedOptions}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}
