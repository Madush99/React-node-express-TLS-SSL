import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
const AdminScreen = () => {
  const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const redirect = () => {
        navigate('/signup')
    }
  return (
    <>
    {userInfo && userInfo.isAdmin ? (
      <>
      <br></br>
      <center>
   <Button onClick={redirect}> Add User</Button>
   </center>
   </>
    ): (
      <Message variant='danger'>Not Authorized</Message>
    )}
    
    </>

  )
}

export default AdminScreen