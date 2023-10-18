import apiUrl from '../apiConfig'
import axios from 'axios'

// Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}
// Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}
// Create
export const createPet = (user, newPet) => {
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}
// Update
export const updatePet = (user, updatedPet) => {
    return axios({
        url: `${apiUrl}/pets/${updatedPet._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}
// Delete
export const removePet = (user, petId) => {
    return axios({
        url: `${apiUrl}/pets/${petId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}