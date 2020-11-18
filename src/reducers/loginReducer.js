import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNotification } from './notificationReducer'

export const setUser = () => {
	return async dispatch => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			blogService.setToken(user.token)
			dispatch({
				type: 'SET_USER',
				data: user
			})
		}
	}
}

export const handleLogin = (username, password) => {
	return async dispatch => {
		try {
			const user = await loginService.authenticate({
				userName: username,
				passWord: password
			})
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			dispatch(createNotification(`Welcome ${user.name}!`, 5, null, 'success'))
			dispatch(setUser())
			blogService.setToken(user.token)
		} catch (exception) {
			dispatch(createNotification('Wrong username or password', 5, null, 'error'))
		}
	}
}

export const removeUser = () => {
	window.localStorage.removeItem('loggedInUser')
	return {
		type: 'REMOVE_USER',
		data: null
	}
}

const loginReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.data
		case 'REMOVE_USER':
			return action.data
		default:
			return state
	}
}

export default loginReducer