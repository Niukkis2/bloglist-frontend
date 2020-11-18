import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'

const Commentform = ({ blogId }) => {
	const content = useField('text')
	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(addComment(content.value, blogId))
		content.onReset()
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<input {...content}></input><button type="submit">add comment</button>
				</div>
			</form>
		</div>
	)
}

export default Commentform