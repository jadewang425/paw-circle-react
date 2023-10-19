import apiUrl from '../apiConfig'
import axios from 'axios'

// Show
export const getOneUser = (user, id) => {
    return axios(`${apiUrl}/pawrent/${id}`)
}