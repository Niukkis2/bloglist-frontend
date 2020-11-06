import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Newblog from './components/Newblog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const onNewBlogSubmit = async (event) => {
    event.preventDefault()
    try {
        const response = await blogService.create({
        title: title,
        author: author,
        url: url,
        userId: user.id
      })
      setBlogs(blogs.concat(response))
      notifyWith(`a new blog ${title} by ${author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
        notifyWith('failed to create new blog', 'error')
        setTimeout(() => {
          setMessage(null)
        }, 2000)
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
      <Newblog onSubmit={onNewBlogSubmit}
               onTitleChange={handleTitleChange}
               title={title}
               onAuthorChange={handleAuthorChange}
               author={author}
               onUrlChange={handleUrlChange}
               url={url}></Newblog>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App