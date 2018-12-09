import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://webapp-ziting.herokuapp.com/'
    // baseURL: 'http://localhost:3000/'
  })
}
