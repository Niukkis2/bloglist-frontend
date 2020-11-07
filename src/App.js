import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
	const [blogs, setBlogs] = useState([])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs.sort((a, b) => b.likes - a.likes))
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const newBlogRef = useRef()

	const notifyWith = (message, type) => {
		setMessage({ message, type })
		setTimeout(() => {
			setMessage(null)
		}, 2000)
	}

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}

	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}

	const onNewBlogSubmit = async (newBlog) => {
		newBlogRef.current.toggleVisiblity()
		try {
			const response = await blogService.create({
				title: newBlog.title,
				author: newBlog.author,
				url: newBlog.url,
				userId: user.id
			})
			setBlogs(blogs.concat(response))
			notifyWith(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
		} catch (exception) {
			notifyWith('failed to create new blog', 'error')
			setTimeout(() => {
				setMessage(null)
			}, 2000)
		}
	}

	const onChangeLikes = async (blog) => {
		try {
			const changedBlog = await blogService.changeLikes(blog)
			setBlogs(blogs.map(blog => blog.id !== changedBlog.id ? blog : changedBlog))
		} catch (exception) {
			notifyWith('failed to change likes', 'error')
			console.log(exception)
		}
	}

	const onDeleteBlog = async (blogToDelete) => {
		if (blogToDelete.user.id === user.id) {
			if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
				try {
					await blogService.deleteBlog(blogToDelete.id)
					setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
					notifyWith('deleted blog', 'success')
				} catch (exception) {
					notifyWith('failed to delete blog', 'error')
					console.log(exception)
				}
			}
		}
	}

	const onLoginSubmit = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.authenticate({
				userName: username,
				passWord: password
			})
			window.localStorage.setItem('loggedInUser', JSON.stringify(user))
			notifyWith(`Welcome ${user.name}!`, 'success')
			setUser(user)
			setUsername('')
			setPassword('')
			blogService.setToken(user.token)
		} catch (exception) {
			notifyWith('Wrong username or password', 'error')
		}
	}

	const handleLogout = (event) => {
		event.preventDefault()
		window.localStorage.removeItem('loggedInUser')
		setUser(null)
	}
	if (!user) {
		return (
			<div>
				<Notification message={message}></Notification>
				<Login onLoginSubmit={onLoginSubmit}
					onUsernameChange={handleUsernameChange}
					onPasswordChange={handlePasswordChange}
					username={username}
					password={password}>
				</Login>
			</div>
		)
	}
	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message}></Notification>
			<div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
			<Togglable
				buttonLabel='create new blog'
				buttonLabel2='cancel'
				ref={newBlogRef}>
				<Newblog
					createBlog={onNewBlogSubmit}
				/>
			</Togglable>
			{blogs.map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					onChangeLikes={() => onChangeLikes(blog)}
					onDeleteBlog={() => onDeleteBlog(blog)}
				/>
			)}
		</div>
	)
}

export default App