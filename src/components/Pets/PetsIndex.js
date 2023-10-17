import { useState, useEffect } from 'react'
import { getAllPets } from '../../api/pet'
import { Container } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

export default function PetsIndex(props) {
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)
    const [activeType, setActiveType] = useState('')

    const { msgAlert, petTypes } = props

    useEffect(() => {
        getAllPets()
            .then(res => {
                if (activeType === '') {
                    setPets(res.data.pets)
                } else {
                    setPets(res.data.pets.filter(pet => pet.type === activeType))
                }
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error getting Pets',
                    message: messages.indexPetFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [activeType])

    if (error) {
        return <LoadingScreen />
    }
    if (!pets) {
        return <LoadingScreen />
    } else if (pets.length === 0) {
        return <Container><p>No Pets added.</p></Container>
    }

    return (
        <main>
            <h1>Pets Index</h1>
        </main>
    )
}