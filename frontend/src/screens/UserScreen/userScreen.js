import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const UserScreen = () => {
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/message')
    }

  return (
    <>
    <Button onClick={redirect}> Message</Button>
    </>
  )
}

export default UserScreen