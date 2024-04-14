import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () =>
  axios.get(baseUrl).then(response => response.data)

export default { getUsers }