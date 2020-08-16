import {CREDENTIALS} from '../fixtures/constants'
import {registerPage} from '../page_object/register.page'

const faker = require('faker');
var fakerFirstName = faker.name.firstName();
var fakerLastName = faker.name.lastName();
var fakerEmail = faker.internet.email();
var fakerPassword = faker.internet.password();


describe('Register module', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get('.nav-link').contains('Register').click()
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('Gradebooks')
    })
    
    it('GB-203 : Register page layout', () => {
        registerPage.firstName.should('be.visible').click()
        registerPage.lastName.should('be.visible').click()
        registerPage.email.should('be.visible').click()
        registerPage.password.should('be.visible').click()
        registerPage.passwordConfirmation.should('be.visible').click()
        registerPage.checkBox.should('be.visible').click()
        registerPage.submit.should('be.visible').click()
    })

    it('GB-204 : Successful registration', () => {
        registerPage.register(fakerFirstName, fakerLastName, fakerPassword, fakerPassword, fakerEmail)
        cy.wait('@Gradebooks')
        registerPage.signOutLink.should('be.visible')
    })

    it('GB-205 : Unsuccessful registration - First name input field: empty', () => {
        registerPage.register('', fakerLastName, fakerPassword, fakerPassword, fakerEmail)
        registerPage.firstName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GB-205 : Unsuccessful registration - Last name input field: empty', () => {
        registerPage.register(fakerFirstName, '', fakerPassword, fakerPassword, fakerEmail)
        registerPage.lastName.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GB-205 : Unsuccessful registration - Password input field: empty', () => {
        registerPage.register(fakerFirstName, fakerLastName, '', fakerPassword, fakerEmail)
        registerPage.password.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GB-205 : Unsuccessful registration - Password confirmation input field: empty', () => {
        registerPage.register(fakerFirstName, fakerLastName, fakerPassword, '', fakerEmail)
        registerPage.passwordConfirmation.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GB-205 : Unsuccessful registration - Email input field: empty', () => {
        registerPage.register(fakerFirstName, fakerLastName, fakerPassword, fakerPassword, '')
        registerPage.email.then(($input) => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.')
            })    
    })

    it('GB-206 : Same user can not register twice', () => {
        registerPage.register(CREDENTIALS.FIRSTNAME, CREDENTIALS.LASTNAME, CREDENTIALS.PASSWORD, CREDENTIALS.PASSWORD, CREDENTIALS.EMAIL)
        cy.wait(6000)
        registerPage.signInLink.should('be.visible')
    })

})