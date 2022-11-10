import { CREATE_MESSAGE_FAIL, CREATE_MESSAGE_REQUEST, CREATE_MESSAGE_RESET, CREATE_MESSAGE_SUCCESS } from "../constants/messageConstants"

export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
          case CREATE_MESSAGE_REQUEST:
                return { loading: true }
          case CREATE_MESSAGE_SUCCESS:
                return { loading: false, message: action.payload }
          case CREATE_MESSAGE_FAIL:
                return { loading: false, error: action.payload }
          case CREATE_MESSAGE_RESET:
                return {}
          default:
                return state
    }
}