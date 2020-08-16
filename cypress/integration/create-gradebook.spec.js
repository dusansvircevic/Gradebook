import {CREDENTIALS} from '../fixtures/constants'
import {signInPage} from '../page_object/sign-in.page'
import {gradebookPage} from '../page_object/create-gradebook.page'

const faker = require('faker');
var fakerTitle = faker.random.word();

describe('Create Gradebook', () => {

  beforeEach(() => {
    cy.visit('/')
    signInPage.signIn(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('Gradebooks')
    cy.wait('@Gradebooks')
    gradebookPage.createGradebookLink.click()
  })

  it('GB-502 : Create Gradebook - page layout', () => {
    gradebookPage.gradebookTitle.should('be.visible')
    gradebookPage.professor.should('be.visible')
    gradebookPage.submit.should('be.visible')
  })

  it('GB-503 : Create Gradebook successfully', () => {
    gradebookPage.createGradebook(fakerTitle, '1')
    cy.get('.h3').contains(' All Gradebooks Page').should('be.visible')
  })

  it('GB-504 : Create Gradebook unsuccessfully - do not select professor', () => {
    gradebookPage.createGradebook(fakerTitle)
    cy.get('.alert').should('be.visible')
                    .should('have.text', '\n        Message: The given data was invalid.\n        \n          [\n  "The professor id field is required."\n]\n        ')   
                    .should('have.class', 'alert') 
  })

  it('GB-505 : Create Gradebook unsuccessfully - Gradebook title empty', () => {
    gradebookPage.createGradebook('', '1')
    cy.get('.alert').should('be.visible')
                    .should('have.text', '\n        Message: The given data was invalid.\n        \n          [\n  "The title field is required."\n]\n        ')   
                    .should('have.class', 'alert') 
  })

  it('GB-506 : Create Gradebook unsuccessfully - less than 2 character for Grradebook title', () => {
    gradebookPage.createGradebook('h', '1')
    cy.get('.alert').should('be.visible')
                    .should('have.text', '\n        Message: The given data was invalid.\n        \n          [\n  "The title must be at least 2 characters."\n]\n        ')   
                    .should('have.class', 'alert') 
  })

})

