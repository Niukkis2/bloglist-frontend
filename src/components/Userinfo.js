import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/loginReducer'

const Userinfo = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	const handleLogout = (event) => {
		event.preventDefault()
		dispatch(removeUser())
	}
	return (
		<span className='userInfo'>
			{user.name} logged in
			<button
				variant="primary"
				id='logoutButton'
				onClick={handleLogout}>
				logout
			</button>
		</span>
	)
}

export default Userinfo