Cypress.Commands.add('login', ({ userName, passWord }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    userName, passWord
  }).then(response => {
    localStorage.setItem('loggedInUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000/')
  })
})

Cypress.Commands.add('createBlog', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'))
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {
      title: 'Why I have tegridy',
      author: 'Randy Marsh',
      url: 'www.randymarsh.com/why-i-have-tegridy',
      userId: user.id
    },
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createMultipleBlogs', () => {
const user = JSON.parse(localStorage.getItem('loggedInUser'))
const blogs = [
    {
      title: 'Why I have tegridy',
      author: 'Randy Marsh',
      url: 'www.randymarsh.com/why-i-have-tegridy',
      userId: user.id
    },
    {
      title: 'Why I am gluten free',
      author: 'Randy Marsh',
      url: 'www.randymarsh.com/why-i-am-gluten-free',
      userId: user.id
    },
    {
      title: 'Why I gave myself cancer',
      author: 'Randy Marsh',
      url: 'www.randymarsh.com/why-i-gave-myself-cancer',
      userId: user.id
    }
  ]
  for (let i = 0; i<blogs.length; i++) {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: {
        title: blogs[i].title,
        author: blogs[i].author,
        url: blogs[i].url,
        likes: i + 100,
        userId: user.id
      },
      headers: {
        'Authorization': `bearer ${user.token}`
      }
    }).then(() => {
      cy.visit('http://localhost:3000')
    })
  }
})