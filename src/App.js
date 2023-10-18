// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import MeetupsIndex from './components/meetups/MeetupsIndex'
import MeetupShow from './components/meetups/MeetupShow'
import MeetupCreate from './components/meetups/MeetupCreate'
import PetsIndex from './components/Pets/PetsIndex'

export default function App () {
	const petTypes = ['Cat', 'Dog', 'Other']
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
	// console.log('MAPBOX_TOKEN', MAPBOX_TOKEN)

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user')
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser)
			setUser(foundUser)
		}
	}, [])

	const clearUser = () => {
		setUser(null)
		localStorage.removeItem('user')
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route
					path='/' 
					element={<Home msgAlert={msgAlert} user={user} />}
				/>
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
					<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
					<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
					</RequireAuth>}
				/>
				<Route
					path='/meetups' 
					element={<MeetupsIndex msgAlert={msgAlert} user={user} petTypes={petTypes} />}
				/>
				<Route
					path='/meetups/create'
					element={
					<RequireAuth user={user}>
						<MeetupCreate msgAlert={msgAlert} user={user} petTypes={petTypes} MAPBOX_TOKEN={MAPBOX_TOKEN} />
					</RequireAuth>}
				/>
				<Route
					path='/meetups/:id' 
					element={<MeetupShow msgAlert={msgAlert} user={user} petTypes={petTypes} MAPBOX_TOKEN={MAPBOX_TOKEN} />}
				/>
				<Route
					path='/pets' 
					element={<PetsIndex msgAlert={msgAlert} user={user} petTypes={petTypes} />}
				/>
				<Route
					path='/pets/create'
					element={
					<RequireAuth user={user}>
						<MeetupCreate msgAlert={msgAlert} user={user} petTypes={petTypes} />
					</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}