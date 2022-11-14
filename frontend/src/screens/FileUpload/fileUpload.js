import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { uploadFile } from '../../actions/fileUploadActions'

const FileUpload = () => {

  const [file, setFile] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const fileUpload = useSelector((state) => state.fileUpload)
  const {loading, error } = fileUpload


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)

    try {
          const config = {
                headers: {
                      'Content-Type': 'multipart/form-data',
                },
          }

          const { data } = await axios.post('/api/uploads/file', formData, config)

          setFile(data)
          setUploading(false)
    } catch (error) {
          console.error(error)
          setUploading(false)
    }
}

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadFile(file))
}

  return (
    <>
    <FormContainer>
    <h1>Upload File</h1>
    {loading ? (
          <Loader />
    ) : error ? (
          <Message variant='danger'>{error}</Message>
    ) : (
          <Form onSubmit={submitHandler}>
                <Form.Group controlId='image'>
                      <Form.Label>File</Form.Label>
                      <Form.Control
                            type='text'
                            placeholder='Enter Image url'
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
                      ></Form.Control>
                      {/* <Form.File
                           // id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                      ></Form.File> */}
                      <input type="file" onChange={uploadFileHandler}/>
                      {uploading && <Loader />}
                </Form.Group>

                <Button type='submit' variant='primary'>
                      Update
                </Button>
          </Form>
    )}
</FormContainer>
</>
  )
}

export default FileUpload