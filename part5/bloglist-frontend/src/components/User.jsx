import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const selectedUser = users.find(eachUser => eachUser.id === id)
  if(!selectedUser) {
    return null
  }
  return (
    <div>
      <h1>{ selectedUser.name }</h1>
      <h2>added blogs</h2>
      {
        selectedUser.blogs.map(blog => <li key={ blog.id }>{ blog.title }</li>)
      }
    </div>
  )
}

export default User