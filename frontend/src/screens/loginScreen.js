import React from 'react'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
              history.push(redirect)
        }

  }, [history, userInfo, redirect])
 
  const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
  }


    return (
        <FormContainer>
                  <h1>SIGN IN</h1>
                  {error && <Message variant='danger'>{error}</Message>}
                  {loading && <Loader />}
                  <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email' className='py-2'>
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password' className='py-2'>
                              <Form.Label>Password</Form.Label>
                              <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group className='py-2'>
                              <Button type='submit' variant='primary'>
                                    Sign In
                              </Button>
                        </Form.Group>

                  </Form>

                  <Row className='py-2'>
                        <Col>
                              New Customer ? {' '}
                              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} >
                                    Register
                              </Link>
                        </Col>

                  </Row>
            </FormContainer>
    )
}

export default LoginScreen