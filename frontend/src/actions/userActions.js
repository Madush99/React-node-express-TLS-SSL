import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants'
import bcrypt from 'bcryptjs'




export const login = (email, password) => async (dispatch) => {
    try {
          dispatch({
                type: USER_LOGIN_REQUEST
          })

          const config = {
                headres: {
                      'Content-Type': 'application/json',
                },
          }
          const { data } = await axios.post('/api/users/login', { email, password }, config)

          dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
          })

          localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {

          dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                      error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
          })

    }
}

export const register = (name, email, password,  role) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const { data } = await axios.post('/api/users/reg', { name, email, password,  role },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
}