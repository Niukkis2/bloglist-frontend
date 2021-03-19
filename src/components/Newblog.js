import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

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
		<div id="container">
			<h2>create new</h2>
			<Form onSubmit={addBlog} className="blogSubmitForm">
				<Form.Label>Title:</Form.Label>
				<Form.Control {...title} />
				<Form.Label>Author:</Form.Label>
				<Form.Control {...author} />
				<Form.Label>Url:</Form.Label>
				<Form.Control {...url} />
				<Button variant="primary" type='submit' id='newBlogSubmitButton'>
					create
				</Button>
			</Form>
		</div>
	)
}
Newblog.propTypes = {
	toggleVisibility: PropTypes.func
}

export default Newblog