import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { changeBlogsLikes } from '../reducers/blogReducer'
import Commentform from './Commentform'

const Blog = () => {
	const id = useParams().id
	const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
	const dispatch = useDispatch()

	const handleLike = (event) => {
		event.preventDefault()
		dispatch(changeBlogsLikes(blog))
	}
	if (!blog) {
		return null
	}
	return (
		<div className="blog">
			<h2>{blog.title} {blog.author}</h2>
			<div>
				<Link to={blog.url}>{blog.url}</Link>
			</div>
			<div>
				{blog.likes} likes <button onClick={handleLike}>like</button>
			</div>
			<div>
				added by {blog.user.name}
			</div>
			<h3>comments</h3>
			<Commentform blogId={blog.id}/>
			<ul>
				{blog.comments.map(comment =>
					<li key={comment.id}>
						{comment.content}
					</li>
				)}
			</ul>
		</div>
	)
}

export default Blog
