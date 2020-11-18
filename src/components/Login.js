import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
const Login = () => {
	const username = useField('text')
	const password = useField('password')

	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(handleLogin(username.value, password.value))
	}
	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={handleSubmit} className="loginForm">
				<div>
					username:
					<input {...username}/>
				</div>
				<div>
					password:
					<input {...password}/>
				</div>
				<div>
					<button id='loginButton' type="submit">login</button>
				</div>
			</form>
		</div>
	)
}

export default Login
