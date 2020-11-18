import React from 'react'
import { Link } from 'react-router-dom'
import Userinfo from './Userinfo'

const Navbar = () => {
	const barStyle = {
		backgroundColor: 'lightgray',
		padding: 5
	}
	return (
		<div style={barStyle}>
			<Link style={{ paddingRight: 5 }} to="/">blogs</Link>
			<Link style={{ paddingRight: 5 }} to="/users">users</Link>
			<Userinfo />
		</div>
	)
}

export default Navbar