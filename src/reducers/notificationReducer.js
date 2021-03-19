const initialNotification = {
	message: '',
	toDisplay: false
}

const showNotification = (message, timeOutID, className) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: {
			message: message,
			className: className,
			timeOutID: timeOutID,
			toDisplay: true
		}
	}
}

const hideNotification = () => {
	return {
		type: 'HIDE_NOTIFICATION',
		data: {
			message: '',
			toDisplay: false
		}
	}
}

export const createNotification = (message, timeout, lastTimeOutID, className) => {
	clearTimeout(lastTimeOutID)
	return async dispatch => {
		const timeOutID = setTimeout(() => {
			dispatch(hideNotification())
		}, timeout * 1000)
		dispatch(showNotification(message, timeOutID, className))
	}
}

const notificationReducer = (state = initialNotification, action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data
		case 'HIDE_NOTIFICATION':
			return action.data
		default:
			return state
	}
}

export default notificationReducer