import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Newblog from './Newblog'

describe('<Newblog />', () => {

	let component
	const mockCreateBlog = jest.fn()

	beforeEach(() => {
		component = render(
			<Newblog
				createBlog={mockCreateBlog}>
			</Newblog>
		)
	})

	test('<Newblog /> form calls event handler with correct details', () => {
		const author = component.container.querySelector('#author')
		const title = component.container.querySelector('#title')
		const url = component.container.querySelector('#url')
		const form = component.container.querySelector('.blogSubmitForm')
		fireEvent.change(author, { target: { value: 'testAuthor' } })
		fireEvent.change(title, { target: { value: 'testTitle' } })
		fireEvent.change(url, { target: { value: 'testUrl' } })
		fireEvent.submit(form)
		expect(mockCreateBlog.mock.calls).toHaveLength(1)
		expect(mockCreateBlog.mock.calls[0][0].author).toBe('testAuthor')
		expect(mockCreateBlog.mock.calls[0][0].title).toBe('testTitle')
		expect(mockCreateBlog.mock.calls[0][0].url).toBe('testUrl')
	})
})