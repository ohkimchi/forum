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
  justify-content: space-around;
  align-items: flex-end;
  text-align: center;
  margin: 5vh auto;
  max-width: 95vw;
`

const FieldsDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const ChildDiv = styled.div`
  margin: 5px;
  text-align: center;
  align-items: center;
`

const ReminderDiv = styled.div`
  text-align: center;
  color: red;
`

const Login = () => {
  const { dispatch } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState(false)
  const [fillInfoReminder, setFillInfoReminder] = useState(false)
  const [checkCaptcha, setCheckCaptcha] = useState(false)
  const [checkUserExistInDB, setCheckUserExistInDB] = useState(true)
  const [loginAgain, setLoginAgain] = useState(false)

  function handleReCaptchaChange(val: any) {
    if (val !== null) {
      setCaptcha(true)
      setCheckCaptcha(false)
    }
  }

  async function checkAccountExisting() {
    let existing = false
    await accountsCollection.get().then((snapshot: any) => {
      snapshot.forEach((doc: any) => {
        if (
          username === doc.data().username &&
          password === doc.data().password
        ) {
          existing = true
        }
      })
    })
    return existing
  }

  async function clickLogin() {
    setLoginAgain(false)
    if (username !== '' && password !== '') {
      if (!captcha) {
        setCheckCaptcha(true)
      } else {
        setCheckCaptcha(false)
        const existing = await checkAccountExisting()
        if (existing) {
          dispatch({
            username,
            currentPage: 'Forum',
            type: AppActionType.SET_LOGIN
          })
        } else {
          setCheckUserExistInDB(false)
        }
      }
    } else {
      setFillInfoReminder(true)
    }
  }

  async function clickRegister() {
    if (username !== '' && password !== '') {
      setFillInfoReminder(false)
      if (!captcha) {
        setCheckCaptcha(true)
      } else {
        const existing = await checkAccountExisting()
        if (!existing && captcha) {
          accountsCollection.add({
            username,
            password
          })
          setCheckUserExistInDB(true)
          setLoginAgain(true)
        }
      }
    } else {
      setFillInfoReminder(true)
    }
  }

  return (
    <div>
      <LoginDiv>
        <FieldsDiv>
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
        </FieldsDiv>

        <ChildDiv>
          <ReCaptcha
            sitekey={sitekeyConst}
            onChange={(val: any) => handleReCaptchaChange(val)}
          />
        </ChildDiv>
      </LoginDiv>

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
      <ReminderDiv>
        <div>
          {fillInfoReminder && <div>Please fill in all the fields.</div>}
        </div>
        <div>
          {checkCaptcha && <div>Please let us know you are not a robot.</div>}
        </div>
        <div>
          {!checkUserExistInDB && (
            <div>
              You might enter your username or password wrong, or do not have an
              account with us. Please register.
            </div>
          )}
        </div>
        <div>{loginAgain && <div>You may login again now.</div>}</div>
      </ReminderDiv>
    </div>
  )
}

export default Login
