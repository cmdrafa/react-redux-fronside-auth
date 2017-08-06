import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

const ROOT_URL = "http://localhost:3090"

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // Submit email and pass to server
        axios.post(`${ROOT_URL}/signin`, { email, password }) //key and value the same email : email, password: password ES6
            .then(response => {
                /* If request is good, update state to indicate user 
                is authenticated, Save the JWT Token and,
                redirect do the route '/feature'*/
                // - Update state
                dispatch({ type: AUTH_USER });
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - Redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch(() => {
                // If request is bad, show error to the user
                dispatch(authError('Bad Login Info'))
            })
    }
}

export const signupUser = ({ email, password }) => {
    return dispatch => {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(error => {
                //console.log('Response:', error);
                dispatch(authError(error.response.data.error));
            })
    }
}

export const signoutUser = () => {
    localStorage.removeItem('token');
    return { type: UNAUTH_USER }
}

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export const fetchMessage = () => {
    return (dispatch) => {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token') }
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            })
    }
}