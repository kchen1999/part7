import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleLogin,
  handleUserNameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          data-testid="username"
          value={username}
          name="username"
          onChange={handleUserNameChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>password</Form.Label>
        <Form.Control
          type="password"
          data-testid="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button variant='primary' type="submit">login</Button>
    </Form>
  )
}

export default LoginForm
