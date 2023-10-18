import { useState, useEffect } from 'react'
import { getAllPets } from '../../api/pet'
import { Container } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import PetTypeFilter from '../shared/PetTypeFilter'
import PetsIndexMain from './PetsIndexMain'

export default function PetsIndex(props) {
    const { msgAlert, petTypes } = props

    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)
    const [activeType, setActiveType] = useState('')

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

    return (
        <main style={{display: 'flex', flexDirection: 'column', margin: '20px', alignItems: 'center'}}>
            <PetTypeFilter 
                activeType={activeType}
                setActiveType={setActiveType}
                petTypes={petTypes}
            />
            <PetsIndexMain 
                pets={pets}
                className='container-md'
            />
        </main>
    )
}