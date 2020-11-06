import React from 'react'
const Login = (props) => {
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={props.onLoginSubmit}>
                <div>username:<input value={props.username} onChange={props.onUsernameChange}></input></div>
                <div>password:<input value={props.password} onChange={props.onPasswordChange}></input></div>
                <div><button type="submit">login</button></div>
            </form>
        </div>
    )
}
export default Login