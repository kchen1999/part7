import Togglable from './Togglable'
import BlogForm from './Blogform'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Home = ({ blogs, addBlog, blogFormRef }) => {
  return (
    <div>
      <h2>Blog app</h2>
      <Togglable buttonLabel="create" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Home