import LoginForm from './Loginform'
import loginService from '../services/login'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'
import { useState, useContext } from 'react'


const Login = ({ setErrorState }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const [user, userDispatch] = useContext(UserContext)

  const resetLoginForm = () => {
    setUsername('')
    setPassword('')
    notificationDispatch({ type: 'RESET' })
  }

  const resetNotificationMessage = () => {
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const login = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(login))
      userDispatch({ type: 'LOGIN', payload: login })
      blogService.setToken(login.token)
      resetLoginForm()
    } catch (exception) {
      setErrorState(true)
      notificationDispatch({ type: 'LOGIN_ERROR' })
      resetNotificationMessage()
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <LoginForm
        handleLogin={handleLogin}
        handleUserNameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </div>
  )
}

export default Login
