import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export const getAll = () =>
  axios.get(baseUrl).then(response => response.data).then((allBlogs) => allBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes))

export const createBlog = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, newObject, config).then(res => res.data)
}

export const commentBlog = (commentObject) => {
  return axios.post(`${baseUrl}/${commentObject.id}`, { content: commentObject.content }).then(res => res.data)
}

export const addLike = (updatedObject) => {
  return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject).then(res => res.data)
}

export const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config).then(res => res.data)
}

export default { setToken }
