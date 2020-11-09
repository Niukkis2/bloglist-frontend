import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Newblog = ({ createBlog }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: title,
			author: author,
			url: url
		})
		setTitle('')
		setAuthor('')
		setUrl('')
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog} className='blogSubmitForm'>
				<div>
					title:
					<input id='title' value={title} onChange={handleTitleChange}
					/>
				</div>
				<div>
					author:
					<input id='author' value={author} onChange={handleAuthorChange}/>
				</div>
				<div>
					url:
					<input id='url' value={url} onChange={handleUrlChange}/>
				</div>
				<div>
					<button type='submit' id='newBlogSubmitButton'>
						create
					</button>
				</div>
			</form>
		</div>
	)
}
Newblog.propTypes = {
	createBlog: PropTypes.func
}

export default Newblog