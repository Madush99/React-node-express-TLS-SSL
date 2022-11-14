import { UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE__FAIL, UPLOAD_FILE__RESET } from "../constants/fileUploadConstants"

export const fileUploadReducer = (state = {}, action) => {
    switch (action.type) {
          case UPLOAD_FILE_REQUEST:
                return { loading: true }
          case UPLOAD_FILE_SUCCESS:
                return { loading: false, message: action.payload }
          case UPLOAD_FILE__FAIL:
                return { loading: false, error: action.payload }
          case UPLOAD_FILE__RESET:
                return {}
          default:
                return state
    }
}