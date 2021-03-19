import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = ((props) => {
	const [visible, setVisible] = useState(false)
	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="primary" id='createNewBlogButton' onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{React.Children.map(props.children, child => {
					return React.cloneElement(child, {
						toggleVisibility: toggleVisibility
					})
				})}
				<Button variant="warning" onClick={toggleVisibility}>{props.buttonLabel2}</Button>
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
