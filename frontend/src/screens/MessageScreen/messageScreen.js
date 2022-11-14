import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { createMessage } from '../../actions/messageActions.js'
import bcrypt from "bcryptjs"

const MessageScreen = () => {

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

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
      <>
    
      <FormContainer>
      <h1>Send Message</h1>
     
      {loading ? (
            <Loader />
      ) : error ? (
            <Message variant='danger'>{error}</Message>
      ) : (
            <>
            { userInfo.role === 'manager' || userInfo.role === 'user' ? (
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
  
                  <Button type='submit' variant='primary'>
                        Update
                  </Button>

            </Form>
            ): <Message variant='danger'>Not authorized</Message>}
</>
      )}
  </FormContainer>
            </>
    
  )
}

export default MessageScreen