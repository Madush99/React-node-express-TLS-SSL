import axios from 'axios';
import { UPLOAD_FILE_REQUEST, UPLOAD_FILE_SUCCESS, UPLOAD_FILE__FAIL } from '../constants/fileUploadConstants';

export const uploadFile = (file) => async (dispatch, getState) => {
    try {
          dispatch({
                type: UPLOAD_FILE_REQUEST,
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

          const { data } = await axios.post(`/api/uploadfile/file`,{ file}, config)

          dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: data,
          })
    } catch (error) {
          dispatch({
                type: UPLOAD_FILE__FAIL,
                payload:
                      error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
          })
    }
}