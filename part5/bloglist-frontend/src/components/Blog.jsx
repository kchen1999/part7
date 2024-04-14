import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, removeBlog, addComment }) => {
  const [comment, setComment] = useState('')

  if(!blog) {
    return null
  }

  const removeBlogHandler = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return removeBlog(blog.id, blog)
    } else {
      return
    }
  }

  const addCommentHandler = (event) => {
    event.preventDefault()
    addComment({ ...blog, content: comment })
    setComment('')
  }

  const paragraphStyle = {
    margin: 0
  }

  const headerStyle = {
    marginTop: 15,
    marginBottom: 15,
  }

  return (
    <div className="blogInfo">
      <h2 style={headerStyle}>
        {blog.title} {blog.author}
      </h2>
      <div className="blogInfoAll">
        <a href={blog.url}>{blog.url}</a>
        <p style={paragraphStyle}>
          likes {blog.likes}{' '}
          <button
            onClick={() =>
              updateBlog({ ...blog, likes: blog.likes + 1 })
            }
          >
            like
          </button>{' '}
        </p>
        <p style={paragraphStyle}>
          added by {blog.user.name}{' '}
          {user.name === blog.user.name ? (
            <button onClick={() => removeBlogHandler(blog)}>remove</button>
          ) : (
            ''
          )}
        </p>
      </div>
      <h3>comments</h3>
      <form onSubmit={addCommentHandler}>
        <input
          type="text"
          name="content"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">
          add comment
        </button>
      </form>
      {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
    </div>
  )
}

export default Blog
