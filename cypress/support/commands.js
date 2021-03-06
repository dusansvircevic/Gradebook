// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })



  Cypress.Commands.add('loginBackend', (mail, pass) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('apiUrl') + '/login',
        form: true,
        followRedirect: true,
        body: {
            email: mail,
            password: pass,
        }
    }).
        then((resp) => {
            expect(resp.body).to.have.property('token')
            localStorage.setItem('user_id', resp.body.user_id)
            localStorage.setItem('token', resp.body.access_token)
                 cy.visit('/')
        })
})

