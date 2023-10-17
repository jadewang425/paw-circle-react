import apiUrl from '../apiConfig'
import axios from 'axios'

// Index
export const getAllMeetups = () => {
    return axios(`${apiUrl}/meetups`)
}
// Show
// Create
// Update
// Delete
