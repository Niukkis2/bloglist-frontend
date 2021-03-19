import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import Userinfo from './Userinfo'

const Topmenu = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand href="/">
				Blog app
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#" as="span">
						<Link style={{ paddingRight: 5 }} to="/">blogs</Link>
					</Nav.Link>
					<Nav.Link href="#" as="span">
						<Link style={{ paddingRight: 5 }} to="/users">users</Link>
					</Nav.Link>
					<Nav.Link href="#" as="span">
						<Userinfo />
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Topmenu