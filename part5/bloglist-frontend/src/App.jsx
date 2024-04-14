import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from './services/blogs'
import userService from './services/users'
import { getAll, createBlog, addLike, deleteBlog, commentBlog } from './services/blogs'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Home from './components/Home'
import User from './components/User'
import Users from './components/Users'
import Login from './components/Login'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'

const App = () => {
  const [errorState, setErrorState] = useState(false)
  const [users, setUsers] = useState([])
  const [user, userDispatch] = useContext(UserContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })
  const updateBlogMutation = useMutation({
    mutationFn: addLike,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    }
  })
  const addCommentMutation = useMutation({
    mutationFn: commentBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const removeBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const blogFormRef = useRef()

  useEffect(() => {
    userService.getUsers().then(userData => {
      setUsers(userData.map(user => ({ id: user.id, name: user.name, blogNum: user.blogs.length, blogs: user.blogs })))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

  const match = useMatch('/blogs/:id')

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll
  })

  if( result.isLoading ) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null


  const resetNotificationMessage = () => {
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }

  const resetSuccessfulNotificationMessage = () => {
    setErrorState(false)
    resetNotificationMessage()
  }

  const setErrorMessage = (exception) => {
    setErrorState(true)
    notificationDispatch({ type: 'ERROR', payload: exception })
    resetNotificationMessage()
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      newBlogMutation.mutate(blogObject)
      notificationDispatch({ type: 'ADD', payload: blogObject })
      userService.getUsers().then(userData => {
        setUsers(userData.map(user => ({ id: user.id, name: user.name, blogNum: user.blogs.length, blogs: user.blogs })))
      })
      resetSuccessfulNotificationMessage()
    } catch (exception) {
      setErrorMessage(exception)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      updateBlogMutation.mutate(blogObject)
      notificationDispatch({ type: 'LIKE', payload: blogObject })
      resetSuccessfulNotificationMessage()
    } catch (exception) {
      setErrorMessage(exception)
    }
  }

  const addComment = async (blogObject) => {
    try {
      addCommentMutation.mutate(blogObject)
      notificationDispatch({ type: 'COMMENT', payload: blogObject })
      resetSuccessfulNotificationMessage()
    } catch (exception) {
      setErrorMessage(exception)
    }
  }

  const removeBlog = async (id, blogObject) => {
    try {
      removeBlogMutation.mutate(id)
      notificationDispatch({ type: 'REMOVE', payload: blogObject })
      userService.getUsers().then(userData => {
        setUsers(userData.map(user => ({ id: user.id, name: user.name, blogNum: user.blogs.length, blogs: user.blogs })))
      })
      resetSuccessfulNotificationMessage()
    } catch (exception) {
      setErrorMessage(exception)
    }
  }

  const padding = {
    padding: 3
  }

  return (
    <div className='container'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <div>
                  <em style={padding}>{user.name} logged in</em>
                  <Form onSubmit={handleLogout} style={{ display: 'inline' }}>
                    <Button variant='secondary' type="submit" >logout</Button>
                  </Form>
                </div>
                : <Link style={padding} to='/login'>login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notification message={notification} errorState={errorState} />
      <Routes>
        <Route path='/blogs/:id' element={<Blog user={user} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} addComment={addComment}/>}/>
        <Route path='/users/:id' element={<User users={users}/>}/>
        <Route path='/users' element={<Users users={users}/>}/>
        <Route path='/blogs' element={<Home blogs={blogs} blogFormRef={blogFormRef} addBlog={addBlog}/>}/>
        <Route path='/login' element={user !== null ? <Home blogs={blogs} blogFormRef={blogFormRef} addBlog={addBlog}/> : <Login errorState={errorState} setErrorState={setErrorState} blogs={blogs} blogFormRef={blogFormRef} addBlog={addBlog}/>}/>
        <Route path='/' element={<Home blogs={blogs} blogFormRef={blogFormRef} addBlog={addBlog}/>}/>
      </Routes>
    </div>
  )
}

export default App
