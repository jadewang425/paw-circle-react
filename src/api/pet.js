import apiUrl from '../apiConfig'
import axios from 'axios'

// Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}
// Show
// Create
// Update
// Delete
