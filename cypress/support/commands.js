import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login')
  cy.findByRole('textbox', { name: /email:/i})
    .type(email)
  cy.findByLabelText(/password:/i)
    .type(password)
  cy.findByRole('button', { name: /login/i}).click()
})

Cypress.Commands.add('addTransaction', (name, amount) => {
  cy.findByRole('textbox', { name: /transaction name:/i })
    .type(name)
  cy.findByRole('spinbutton', {  name: /amount \(\$\):/i})
    .type(amount)
  cy.findByRole('button', {  name: /add transaction/i}).click()
})