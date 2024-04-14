import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          { users.map(eachUser => (
            <tr key={ eachUser.id }>
              <td><Link to={`/users/${eachUser.id}`}>{ eachUser.name }</Link></td>
              <td>{ eachUser.blogNum }</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )}

export default Users