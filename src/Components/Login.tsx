import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import React, { useContext, useState } from 'react'
import ReCaptcha from 'react-google-recaptcha'
import styled from 'styled-components'
import { AppActionType, AppContext } from '../App/AppReducer'
import { accountsCollection } from '../utils/firebase'

const sitekeyConst = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  width: 70vw;
`
const ChildDiv = styled.div`
  margin: 5px;
  text-align: center;
`

const Login = () => {
  const { state, dispatch } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState(false)

  function handleReCaptchaChange(val: any) {
    if (val !== null) {
      setCaptcha(false)
    }
  }

  async function checkAccountExisting() {
    let existing = false
    await accountsCollection.get().then((snapshot: any) => {
      snapshot.forEach((doc: any) => {
        console.log(doc.data().username, doc.data().password)
        if (
          username === doc.data().username &&
          password === doc.data().password
        ) {
          existing = true
        }
      })
    })
    console.log(existing, 'existing')
    return existing
  }

  async function clickLogin() {
    const existing = await checkAccountExisting()
    if (existing) {
      dispatch({
        username,
        currentPage: 'Forum',
        type: AppActionType.SET_LOGIN
      })
    } else {
      setUsername('')
      setPassword('')
      setCaptcha(false)
    }
  }

  function clickRegister() {
    if (!checkAccountExisting() && captcha) {
      accountsCollection.add({
        username,
        password
      })
    }
  }

  return (
    <LoginDiv>
      <ChildDiv>
        <TextField
          id='standard-basic'
          label='Username'
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </ChildDiv>
      <ChildDiv>
        <TextField
          id='standard-basic'
          label='Password'
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </ChildDiv>
      <ChildDiv>
        <ReCaptcha
          sitekey={sitekeyConst}
          onChange={(val: any) => handleReCaptchaChange(val)}
        />
      </ChildDiv>

      <ChildDiv>
        <Button variant='contained' onClick={() => clickLogin()}>
          Login
        </Button>
      </ChildDiv>
      <ChildDiv>
        <Button variant='contained' onClick={() => clickRegister()}>
          Register
        </Button>
      </ChildDiv>
    </LoginDiv>
  )
}

export default Login
