import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../src/components/Message.js'
import Loader from '../../src/components/Loader'
import FormContainer from '../../src/components/FormContainer'
import { createMessage } from '../actions/messageActions.js'
import bcrypt from "bcryptjs"

const ManagerScreen = () => {

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const messageCreate = useSelector((state) => state.messageCreate)
  const {loading, error} = messageCreate

const hashMessage = bcrypt.hashSync(message, 10);

bcrypt.compare(message, hashMessage, function(err, isMatch){
      if(err){
            throw err;
      }else if(!isMatch){
            console.log("Message  dost not Match")
      }else{
            console.log("Message match")
      }
})

console.log(hashMessage)
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createMessage(hashMessage))
}

  return (
    <FormContainer>
    <h1>Send Message</h1>
    {loading ? (
          <Loader />
    ) : error ? (
          <Message variant='danger'>{error}</Message>
    ) : (
          <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                      ></Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='price'>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                            type='number'
                            placeholder='Enter price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                      ></Form.Control>
                </Form.Group> */}

                {/* <Form.Group controlId='image'>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                            type='text'
                            placeholder='Enter Image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                      ></Form.Control>
                      <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                      ></Form.File>
                      {uploading && <Loader />}
                </Form.Group> */}

                {/* <Form.Group controlId='brand'>
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                            type='text'
                            placeholder='Enter brand '
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                      ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                            type='number'
                            placeholder='Enter count in stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                      ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                      ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                      ></Form.Control>
                </Form.Group> */}


                <Button type='submit' variant='primary'>
                      Update
                </Button>
          </Form>
    )}
</FormContainer>
  )
}

export default ManagerScreen