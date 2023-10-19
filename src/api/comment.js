import apiUrl from '../apiConfig'
import axios from 'axios'

// Create Comment
export const addComment = (user, meetupId, newComment) => {
    return axios({
        url: `${apiUrl}/meetups/${meetupId}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: newComment }
    })
}
// Update Comment
export const updateComment = (user, meetupId, updatedComment) => {
    return axios({
        url: `${apiUrl}/meetups/${meetupId}/${updatedComment._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { comment: updatedComment }
    })
}
// Delete Comment
export const deleteComment = (user, meetupId, commentId) => {
    return axios({
        url: `${apiUrl}/meetups/${meetupId}/${commentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}