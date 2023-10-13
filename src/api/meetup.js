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
export const createMeetup = (user, newMeetup) => {
    return axios({
        url: `${apiUrl}/meetups`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { meetup: newMeetup }
    })
}
// Update
// Delete