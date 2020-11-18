import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

export const createBlog = (newBlog) => {
	return async dispatch => {
		try {
			const blog = await blogService.create(newBlog)
			dispatch({
				type: 'CREATE_BLOG',
				data: blog
			})
			dispatch(createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 5, null, 'success'))
		} catch (e) {
			dispatch(createNotification('failed to create new blog', 5, null, 'error'))
		}
	}
}

export const initBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export const removeBlog = (blogToRemove) => {
	return async dispatch => {
		if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
			try {
				await blogService.deleteBlog(blogToRemove.id)
				dispatch(createNotification(`deleted blog ${blogToRemove.title} by ${blogToRemove.author}`, 5, null, 'success'))
				dispatch({
					type: 'REMOVE_BLOG',
					data: blogToRemove
				})
			} catch (e) {
				dispatch(createNotification('failed to delete blog', 5, null, 'error'))
			}
		}
	}
}

export const addComment = (comment, id) => {
	return async dispatch => {
		const changedBlog = await blogService.postComment(comment, id)
		dispatch({
			type: 'ADD_COMMENT',
			data: changedBlog
		})
	}
}

export const changeBlogsLikes = (blog) => {
	return async dispatch => {
		try {
			const changedBlog = await blogService.changeLikes(blog)
			dispatch({
				type: 'CHANGE_LIKES',
				data: changedBlog
			})
		} catch (exception) {
			dispatch(createNotification('failed to change likes', 5, null, 'error'))
		}
	}
}

const blogReducer = (state = [], action) => {
	switch(action.type) {
		case 'CREATE_BLOG':
			return [...state, action.data]
		case 'REMOVE_BLOG':
			return state.filter(blog => blog.id !== action.data.id)
		case 'CHANGE_LIKES':
			return state.map(blog => blog.id !== action.data.id ? blog : action.data)
		case 'ADD_COMMENT':
			return state.map(blog => blog.id !== action.data.id ? blog : action.data)
		case 'INIT_BLOGS':
			return action.data
		default:
			return state
	}
}

export default blogReducer