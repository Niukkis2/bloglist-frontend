import React from 'react'

const Newblog = (props) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={props.onSubmit}>
                <div>title:<input value={props.title} onChange={props.onTitleChange}></input></div>
                <div>author:<input value={props.author} onChange={props.onAuthorChange}></input></div>
                <div>url:<input value={props.url} onChange={props.onUrlChange}></input></div>
                <div><button type="submit">create</button></div>
            </form>
        </div>
    )
}

export default Newblog