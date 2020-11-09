import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog /> tests', () => {

	let component
	const mockOnChangeLikes = jest.fn()
	const mockOnDeleteBlog = jest.fn()
	const blog = {
		title: 'Component testing',
		author: 'Me',
		url: 'www.testing.com',
		likes: 0,
		user: {
			name: 'TestName'
		}
	}

	beforeEach(() => {
		component = render(
			<Blog
				blog={blog}
				onChangeLikes={mockOnChangeLikes}
				onDeleteBlog={mockOnDeleteBlog}>
			</Blog>
		)
	})

	test('<Blog /> does not render url or likes by default', () => {
		const hiddenByDefault = component.container.querySelector('.blogTogglableDiv')
		expect(hiddenByDefault).toHaveStyle('display: none')
	})

	test('<Blog /> url and likes are shown when button is clicked', () => {
		const showButton = component.container.querySelector('.blogShowButton')
		fireEvent.click(showButton)
		const shouldBeVisible = component.container.querySelector('.blogTogglableDiv')
		expect(shouldBeVisible).not.toHaveStyle('display: none')
	})

	test('<Blog /> like button handler is fired twice when button is clicked twice', () => {
		const likeButton = component.container.querySelector('.blogLikeButton')
		for (let i = 0; i<2; i++) {
			fireEvent.click(likeButton)
		}
		expect(mockOnChangeLikes.mock.calls).toHaveLength(2)
	})
})
