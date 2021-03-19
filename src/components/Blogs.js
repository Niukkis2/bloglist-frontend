import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
	const blogs = useSelector(state => state.blogs.sort((a, b) => b.likes - a.likes))
	return (
		<div className="blogTable">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
					</tr>
				</thead>
				<tbody>
					{blogs.map(blog =>
						<tr key={blog.id}>
							<td>
								<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
							</td>
							<td>{blog.author}</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Blogs