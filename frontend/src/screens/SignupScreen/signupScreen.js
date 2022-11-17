import React, { useState, useEffect } from 'react'
import './signup.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../../actions/userActions.js'
import Message from '../../components/Message.js'
import Loader from '../../components/Loader.js'
import { logout } from '../../actions/userActions'
import bcrypt from 'bcryptjs'

const SignupScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate();


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userRegister

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    //const hashPassword = bcrypt.hashSync(password, 10);

    // useEffect(() => {
    //     if (userInfo) {
    //        ;
    //         // return <Navigate to ="/admin" replace={true}/>
    //     }

    // }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else {
            dispatch(register(name, email, password, role))
            logoutHandler()
        }
    }
    const logoutHandler = () => {
        dispatch(logout())
  }
    return (
        <>
            {userInfo && userInfo.isAdmin ? (

                <div className="maincontainer">
                    <div class="container-fluid">
                        <div class="row no-gutter">

                            <div class="col-md-6 d-none d-md-flex bg-image1"></div>

                            <div class="col-md-6 bg-light">
                                <div class="signup d-flex align-items-center py-5">

                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-10 col-xl-7 mx-auto">
                                                <div className='nm'>
                                                    {error && <Message variant='danger'>{message}</Message>}
                                                    {error && <Message variant='danger'>{error}</Message>}
                                                    {loading && <Loader />}
                                                </div>
                                                <center>

                                                    <h3 class="display-4">ADD USER</h3>
                                                </center>
                                                <br />

                                                <form onSubmit={submitHandler}>
                                                    <div class="form-group mb-3">

                                                        < input id="Enter Name" type="text" placeholder="Enter Name" required="" autofocus="" className="form-control rounded-pill border-0 shadow-sm px-4"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-3">

                                                        <input id="inputEmail" type="email" placeholder="Enter Email" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)} />
                                                    </div>

                                                    <div class="form-group mb-3">
                                                        <select placeholder='Select User Role' id='role' required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" value={role} onChange={(e) => setRole(e.target.value)}>
                                                            <option value="manager">Manager</option>
                                                            <option value="user">User</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group mb-3">

                                                        <input id="inputPassword" type="password" placeholder="Enter Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)} />
                                                    </div>
                                                    <div class="form-group mb-3">

                                                        <input id="inputPassword" type="password" placeholder="Confirm Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)} />
                                                    </div>
                                                    <br />
                                                    <button type="submit" class="btn btn-outline-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm">ADD USER</button>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<Message variant='danger'>Not Authorized</Message>)}

        </>
    )
}

export default SignupScreen