import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisiblity = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisiblity
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<button id='createNewBlogButton' onClick={toggleVisiblity}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisiblity}>{props.buttonLabel2}</button>
			</div>
		</div>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
	buttonLabel2: PropTypes.string.isRequired,
	children: PropTypes.any
}

Togglable.displayName = 'Togglable'

export default Togglable
