import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
  case 'LOGIN_ERROR':
    return 'Wrong Credentials'
  case 'RESET':
    return null
  case 'ERROR':
    return `${action.payload}`
  case 'ADD':
    return `${action.payload.title} ${action.payload.author} added`
  case 'LIKE':
    return `${action.payload.title} ${action.payload.author} received a like`
  case 'COMMENT':
    return `${action.payload.title} ${action.payload.author} received a comment`
  case 'REMOVE':
    return `${action.payload.title} ${action.payload.author} removed`
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext