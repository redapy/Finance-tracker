const {deleteTestUser} = require('../../src/firebase/adminConfig') 
/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    "clear:db": () => {
      return deleteTestUser()
    }
  })
}
