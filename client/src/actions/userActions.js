import axios from 'axios'

export const loginUser = (cred) => {
    return async(dispatch) => {
        try {
            dispatch({type: 'LOGIN_USER'})
            const res = await axios.post('/api/users/login', cred)

            dispatch({type:'LOGIN_USER_SUCCESS', payload: res.data})

        } catch (e) {
            dispatch({type: 'LOGIN_USER_ERROR', payload: e.response.data})
        }
    }
}

export const registerUser = (cred) => {
    return async(dispatch) => {
        try {
            dispatch({type: 'REGISTER_USER'})
            const res = await axios.post('/api/users/register', cred)
            
            dispatch({type:'REGISTER_USER_SUCCESS', payload: res.data})
        } 
        catch (e) {
            dispatch({type: 'REGISTER_USER_ERROR', payload: e.response.data})
        }
    }
}

export const getUserProfile = () => {
    return async(dispatch) => {
        try {
            dispatch({type: 'GET_USER_PROFILE'})
            const res = await axios.get('https://jsonplaceholder.typicode.com/users')
            dispatch({type: 'GET_USER_PROFILE_SUCCESS', payload: res.data[0]})
        } 
        catch (e) {
            dispatch({type: 'GET_USER_PROFILE_ERROR', payload: e})
            
        }
    }
}