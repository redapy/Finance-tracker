import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login')
  cy.findByRole('textbox', { name: /email:/i})
    .type(email)
  cy.findByLabelText(/password:/i)
    .type(password)
  cy.findByRole('button', { name: /login/i}).click()
})