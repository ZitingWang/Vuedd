describe('Post page', () => {
  beforeEach(() => {
    cy.visit('/')
    // Click Donate navbar link
    cy.get('.navbar-nav:nth-child(1)')
      .find('.nav-item:nth-child(3)').click()
  })

  it('allows a valid post to be submitted', () => {
    // Fill out web form
    cy.get('label').contains('Writer').next().type('BJ')
    cy.get('label').contains('Content').next().type('shisb')
    cy.contains('Thanks for your Post').should('not.exist')
    cy.get('.error').should('not.exist')
    cy.get('button[type=submit]').click()
    cy.contains('Thanks for your Post').should('exist')
  })

  it('shows error messages for incomplete form fields', () => {
    cy.get('button[type=submit]').click()
    cy.get('.error').contains('Content')
    cy.get('label').contains('Content').next().type('Best wishes')
    cy.get('.error').should('not.exist')
  })
})
