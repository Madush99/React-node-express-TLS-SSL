import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'

const ManagerScreen = () => {
    const navigate = useNavigate();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const redirect = () => {
        navigate('/message')
    }

    const redirect1 = () => {
        navigate('/fileupload')
    }
  return (
    <>
    {userInfo && userInfo.role === 'manager' ? (
      <>
   <Button onClick={redirect}> Message</Button>
   <Button onClick={redirect1}> File Upload</Button>
   </>
    ): (
      <Message variant='danger'>Not Authorized</Message>
    )}
    
    </>
  )
}

export default ManagerScreen