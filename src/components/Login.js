import React from 'react'
import PropTypes from 'prop-types'
const Login = ({
	onLoginSubmit,
	onUsernameChange,
	onPasswordChange,
	username,
	password
}) => {
	return (
		<div>
			<h2>log in to application</h2>
			<form onSubmit={onLoginSubmit}>
				<div>
          username:
					<input
						value={username}
						onChange={onUsernameChange}
					/>
				</div>
				<div>
          password:
					<input
						type="password"
						value={password}
						onChange={onPasswordChange}
					/>
				</div>
				<div>
					<button type="submit">login</button>
				</div>
			</form>
		</div>
	)
}

Login.propTypes = {
	onLoginSubmit: PropTypes.func,
	onUsernameChange: PropTypes.func,
	onPasswordChange: PropTypes.func,
	username: PropTypes.string,
	password: PropTypes.string
}

export default Login
