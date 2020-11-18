import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
				<button id='createNewBlogButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
			<div style={showWhenVisible}>
				{React.Children.map(props.children, child => {
					return React.cloneElement(child, {
						toggleVisibility: toggleVisibility
					})
				})}
				<button onClick={toggleVisibility}>{props.buttonLabel2}</button>
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
