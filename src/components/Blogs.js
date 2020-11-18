import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
	border: '2px solid black',
	marginBottom: 5,
	marginTop: 5,
	padding: '5px',
}

const Blogs = () => {
	const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
	return (
		<div id='blogWrapper'>
			{blogs.map(blog =>
				<div key={blog.id} style={blogStyle}>
					<Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
				</div>
			)}
		</div>
	)
}

export default Blogs