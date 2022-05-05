describe('Navbar Component', () => {
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
        cy.visit('http://localhost:3000/')
    })

    it('Displays the correct links when the user is Not logged in', () => {
        cy.findByRole('link', {  name: /login/i}).should('exist')
        cy.findByRole('link', { name: /signup/i }).should('exist')
    })

    it('Displays the correct links when the user is logged in and it logout the user correctly', () => {
        cy.login('test@gmail.com', '123456')
        cy.findByText(/test user/i).should('exist')
        cy.findByRole('button', { name: /log out/i }).should('exist')
        cy.findByRole('button', { name: /log out/i }).click()
        cy.url().should('eq', 'http://localhost:3000/login')
    })

})