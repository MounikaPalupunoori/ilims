import axios from 'axios'
const URL = import.meta.env.VITE_BASE_API_URL
const instance = axios.create({
  baseURL: URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization',
    // 'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
  }
})
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
