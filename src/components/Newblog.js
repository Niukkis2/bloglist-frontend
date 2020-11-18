import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const Newblog = ({ toggleVisibility }) => {
	const userId = useSelector(state => state.user.id)
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const dispatch = useDispatch()

	const addBlog = (event) => {
		toggleVisibility()
		event.preventDefault()
		dispatch(createBlog({
			title: title.value,
			author: author.value,
			url: url.value,
			userId: userId
		}))
		title.onReset()
		author.onReset()
		url.onReset()
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addBlog} className='blogSubmitForm'>
				<div>
					title:
					<input id='title' {...title}/>
				</div>
				<div>
					author:
					<input id='author' {...author}/>
				</div>
				<div>
					url:
					<input id='url' {...url}/>
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
	toggleVisibility: PropTypes.func
}

export default Newblog