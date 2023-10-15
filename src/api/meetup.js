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
export const updateMeetup = (user, updatedMeetup) => {
    return axios({
        url: `${apiUrl}/meetups/${updatedMeetup._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { meetup: updatedMeetup }
    })
}
// Delete
export const deleteMeetup = (user, meetupId) => {
    return axios({
        url: `${apiUrl}/meetups/${meetupId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}