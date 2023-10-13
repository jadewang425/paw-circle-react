import apiUrl from '../apiConfig'
import axios from 'axios'

// Index
export const getAllMeetups = () => {
    return axios(`${apiUrl}/meetups`)
}

// Show
export const getOneMeetup = (id) => {
    return axios(`${apiUrl}/meetups/${id}`)
}
// Create
// Update
// Delete