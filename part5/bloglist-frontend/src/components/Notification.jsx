import { Alert } from 'react-bootstrap'

const Notification = ({ message, errorState }) => {
  if (message === null) {
    return null
  }

  if (errorState) {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    )
  } else {
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  }
}

export default Notification
