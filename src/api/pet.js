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

// Update
// Delete
