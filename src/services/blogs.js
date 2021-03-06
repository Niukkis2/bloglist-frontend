import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = newBlog => {
	const request = axios.post(baseUrl, newBlog, {
		headers: {
			'Authorization': token
		}
	})
	return request.then(response => response.data)
}

const deleteBlog = id => {
	const request = axios.delete(`${baseUrl}/${id}`, {
		headers: {
			'Authorization': token
		}
	})
	return request.then(response => response.data)
}

const changeLikes = blog => {
	const request = axios.put(`${baseUrl}/${blog.id}`, blog)
	return request.then(response => response.data)
}

const postComment = (comment, id) => {
	const request = axios.post(`${baseUrl}/${id}/comments`, { content: comment })
	return request.then(response => response.data)
}

export default { getAll, create, setToken, changeLikes, deleteBlog, postComment }