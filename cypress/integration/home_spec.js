
describe('Home Page', () => {
    const TransactionOne = {name: 'ps5', amount: 500}
    const TransactionTwo= {name: 'water', amount: 6}
    const TransactionThree = {name: 'bills', amount: 50}
    beforeEach(() => {
        indexedDB.deleteDatabase('firebaseLocalStorageDb');
        cy.login('test@gmail.com', '123456')
        cy.task("clear:firestore")
    })

    it("adds and delete a single transaction", () => {
        cy.addTransaction(TransactionOne.name, TransactionOne.amount)
        cy.findByRole('button', {  name: /adding.../i}).should('exist')
        cy.findByText(TransactionOne.name).should('exist')
        //delete the transaction
        cy.findByRole('button', {  name: /x/i}).click()
        cy.findByText(TransactionOne.name).should('not.exist')
    })
 
    it("adds multiple transactions", () => {
        cy.addTransaction(TransactionOne.name, TransactionOne.amount)
        cy.findByRole('button', {  name: /adding.../i}).should('not.exist')
        cy.addTransaction(TransactionTwo.name, TransactionTwo.amount)
        cy.findByRole('button', {  name: /adding.../i}).should('not.exist')
        cy.addTransaction(TransactionThree.name, TransactionThree.amount)
        cy.findAllByTestId('transaction').should('have.length', 3)
    })

})