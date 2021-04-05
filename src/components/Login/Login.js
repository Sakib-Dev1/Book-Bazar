import { Button, Container, makeStyles, Paper } from '@material-ui/core'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../helpers/firebase.config'
import { loginSuccessAction } from '../../store/action/actions'
import { store } from '../../store/store'

const useStyles = makeStyles((theme) => ({
  middle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const Login = () => {
  const classes = useStyles()

  const history = useHistory()
  const location = useLocation()

  const {
    dispatch,
    state: { user },
  } = useContext(store)

  let { from } = location.state || { from: { pathname: '/' } }

  useEffect(() => {
    if (user?.name) {
      history.replace(from)
    }
  }, [user])

  const loginUser = async (authToken) => {
    return axios.post(
      'https://book-bazar1.herokuapp.com/login',
      {},
      {
        headers: {
          authToken,
        },
      }
    )
  }

  return (
    <Container>
      <div className={classes.middle}>
        <Button
          variant='contained'
          color='primary'
          onClick={async () => {
            try {
              const { user } = await auth.signInWithPopup(googleAuthProvider)
              const idTokenResult = await user.getIdTokenResult()
              const res = await loginUser(idTokenResult.token)
              dispatch(loginSuccessAction(res.data, idTokenResult.token))
              history.replace(from)
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Login With Google
        </Button>
      </div>
    </Container>
  )
}

export default Login
