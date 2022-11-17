import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message'

const UserScreen = () => {
  const navigate = useNavigate();


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const redirect = () => {
    navigate('/message')
  }

  return (
    <>
      {userInfo && userInfo.role === 'user' ? (
        <center>
          <h1> Worker Home</h1>
          <img src='https://icons.veryicon.com/png/o/business/blue-business-icon/send-message-4.png' width={100} height={100} alt="Add file" onClick={redirect} />
        </center>

      ) : <Message variant='danger'>Not authorized</Message>}

    </>
  )
}

export default UserScreen