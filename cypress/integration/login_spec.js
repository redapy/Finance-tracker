describe('Login page',() => {
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
    })

    it('login the user and redirect it to the home page', () => {
        cy.login('test@gmail.com', '123456')
        cy.url().should('eq', 'http://localhost:3000/')
    })
})