describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.navbar-nav:nth-child(2)')
      .find('.nav-item:nth-child(3)').click()
  })
  it('Shows a header', () => {
    cy.get('.vue-title').should('contain', 'LOGIN')
  })
  it('Shows api container', () => {
    cy.get('.firebaseui-idp-list').find(':nth-child(1)').find('.firebaseui-idp-text').should('contain', 'Facebook')
    cy.get('.firebaseui-idp-list').find(':nth-child(2)').find('.firebaseui-idp-text').should('contain', 'Google')
    cy.get('.firebaseui-idp-list').find(':nth-child(3)').find('.firebaseui-idp-text').should('contain', 'email')
  })
})
