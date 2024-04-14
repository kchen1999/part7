import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="title"
            data-testid="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="author"
            data-testid="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="url"
            data-testid="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </Form.Group>
        <Button variant='secondary' type="submit" style={{ marginTop: 5, marginBottom: 5}}>create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
