import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import Blogs from './components/Blogs'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { initUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import Topmenu from './components/Topmenu'


const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initBlogs())
	}, [dispatch])

	useEffect(() => {
		dispatch(setUser())
	}, [dispatch])

	useEffect(() => {
		dispatch(initUsers())
	}, [dispatch])

	if (user === null) {
		return (
			<div>
				<Notification />
				<Login />
			</div>
		)
	}
	return (
		<Router>
			<div className="container">
				<Topmenu />
				<Notification />
				<Switch>
					<Route path="/blogs/:id">
						<Blog />
					</Route>
					<Route path="/users/:id">
						<User />
					</Route>
					<Route path="/users">
						<Users />
					</Route>
					<Route path="/">
						<Togglable
							buttonLabel='create new blog'
							buttonLabel2='cancel'>
							<Newblog />
						</Togglable>
						<Blogs />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App