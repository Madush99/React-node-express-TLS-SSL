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

      
      <center>
        <br></br>
      <h1> Manger Home</h1>
        <br></br>
        <br></br>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8vgTGhD1tKW3WMnkYs19oGEnIKaEE6g99g&usqp=CAU' width={100} height={100}  alt="Add file" onClick={redirect1}/>
      <br></br>
      <br></br>
      <img src='https://icons.veryicon.com/png/o/business/blue-business-icon/send-message-4.png' width={100} height={100}  alt="Add file" onClick={redirect}/>
      </center>
   
   </>
    ): (
      <Message variant='danger'>Not Authorized</Message>
    )}
    
    </>
  )
}

export default ManagerScreen