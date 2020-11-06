import axios from 'axios'
const baseUrl = '/api/login'

const authenticate = async (loginDetails) => {
    const request = await axios.post(baseUrl, loginDetails)
    return request.data
}

export default { authenticate }