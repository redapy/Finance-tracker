
describe('Signup page', () => {
    beforeEach(() => {
        cy.task('clear:db')
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
        cy.visit('http://localhost:3000/signup');
    })
    it('signups the user', () => {
        cy.findByRole('textbox', { name: /email:/i })
            .type('test@gmail.com')
        cy.findByLabelText(/password:/i)
            .type('123456')
        cy.findByRole('textbox', { name: /username:/i })
            .type('test user')
        cy.findByRole('button', { name: /sign up/i }).click()
        cy.findByRole('button', { name: /please wait/i }).should("exist")

        cy.url().should('eq', 'http://localhost:3000/')
    })
})