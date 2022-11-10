import axios from 'axios';
import { CREATE_MESSAGE_FAIL, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_SUCCESS } from '../constants/messageConstants';

export const createMessage = (message) => async (dispatch, getState) => {
    try {
          dispatch({
                type: CREATE_MESSAGE_REQUEST,
          })

          const {
                userLogin: { userInfo },
          } = getState()

          const config = {
                headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${userInfo.token}`,
                },
          }

          const { data } = await axios.post(`/api/msg/message`,{ message}, config)

          dispatch({
                type: CREATE_MESSAGE_SUCCESS,
                payload: data,
          })
    } catch (error) {
          dispatch({
                type: CREATE_MESSAGE_FAIL,
                payload:
                      error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
          })
    }
}