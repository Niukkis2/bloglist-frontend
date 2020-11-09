import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
	border: '2px solid black',
	marginBottom: 5,
	marginTop: 5,
	padding: '5px',
}

const Blog = ({ blog, onChangeLikes, onDeleteBlog }) => {
	const [visible, setVisible] = useState(false)
	const [label, setLabel] = useState('view')
	const showWhenVisible = { display: visible ? '' : 'none' }

	const handleClick = () => {
		setVisible(!visible)
		setLabel(label === 'view' ? 'hide' : 'view')
	}

	return (
		<div style={blogStyle} className="blog">
			{blog.title} {blog.author} <button onClick={handleClick} className='blogShowButton'>{label}</button>
			<div style={showWhenVisible} className='blogTogglableDiv'>
				<div>
					{blog.url}
				</div>
				<div id="blogLikesDiv">
					{blog.likes} <button onClick={onChangeLikes} className='blogLikeButton'>like</button>
				</div>
				<div>
					{blog.user.name}
				</div>
				<div>
					<button onClick={onDeleteBlog} className='blogRemoveButton'>remove</button>
				</div>
			</div>
		</div>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	onChangeLikes: PropTypes.func.isRequired,
	onDeleteBlog: PropTypes.func.isRequired
}

export default Blog
