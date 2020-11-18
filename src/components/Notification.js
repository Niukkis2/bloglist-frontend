import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	return (
		<div className={notification.className}>
			{notification.message}
		</div>
	)
}
Notification.propTypes = {
	message: PropTypes.object
}

export default Notification