describe('Blog app', function () {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset')
		const users = [{
			name: 'Randy Marsh',
			userName: 'randy69',
			passWord: '1234'
		},
		{
			name: 'Gerald Broflovski',
			userName: 'Dildo Swaggins',
			passWord: '4321'
		}]
		users.forEach(user => cy.request('POST', 'http://localhost:3001/api/users', user))
		cy.visit('http://localhost:3000')
	})
	it('Login form is shown', function () {
		cy.contains('log in to application')
		cy.contains('username')
		cy.contains('password')
	})
	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('randy69')
			cy.get('#password').type('1234')
			cy.get('#loginButton').click()
			cy.get('.success').contains('Welcome Randy Marsh!')
		})
		it('fails with wrong credentials', function() {
			cy.get('#username').type('randy69')
			cy.get('#password').type('wrongpw')
			cy.get('#loginButton').click()
			const msg = cy.get('.error')
			msg.contains('Wrong username or password')
			msg.should('have.css', 'color', 'rgb(255, 0, 0)')
		})
	})
	describe('When logged in', function() {
		beforeEach(function () {
			cy.login({ userName: 'randy69', passWord: '1234' })
			cy.createBlog()
		})
		it('blog can be created', function() {
			cy.contains('Why I have tegridy Randy Marsh')
		})
		it('blog can be liked', function() {
			cy.get('.blogShowButton').click()
			cy.get('.blogLikeButton').click()
			cy.get('#blogLikesDiv').contains(1)
		})
		it('blog can be removed with correct authorization', function() {
			cy.get('.blogShowButton').click()
			cy.get('.blogRemoveButton').click()
			cy.on('window:confirm', () => true)
			cy.get('.success').contains('deleted blog')
			cy.contains('Why I have tegridy Randy Marsh').should('not.exist')
		})
		it('blog cannot be removed without correct authorization', function() {
			cy.get('#logoutButton').click()
			cy.login({ userName: 'Dildo Swaggins', passWord: '4321' })
			cy.get('.blogShowButton').click()
			cy.get('.blogRemoveButton').click()
			cy.on('window:confirm', () => true)
			cy.get('.error').contains('You cannot delete other users blogs')
			cy.contains('Why I have tegridy Randy Marsh')
		})
	})
	describe('When there are multiple blogs', function() {
		beforeEach(function() {
			cy.login({ userName: 'randy69', passWord: '1234' })
			cy.createMultipleBlogs()
		})
		it('should be ordered by likes', function() {
			let likes = []
			cy.get('.blog').find('#blogLikesDiv').each(element => {
				cy
					.wrap(element)
					.invoke('text')
					.as('value')
					.then(() => {
						likes.push(this.value)
					})
			}).then(() => {
				expect(likes
					.map(like => like.split(' ')[0]))
					.to
					.eql(likes
						.map(like => like.split(' ')[0])
						.sort((a, b) => b - a))
			})
		})
	})
})