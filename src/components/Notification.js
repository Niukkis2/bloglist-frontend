import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	if (!notification.toDisplay) {
		return null
	}
	return (
		<Alert variant={notification.className}>
			{notification.message}
		</Alert>
	)
}

export default Notification