import {CREDENTIALS} from '../fixtures/constants'
import {signInPage} from '../page_object/sign-in.page'
import {professorPage} from '../page_object/create-professor.page'

const faker = require('faker');
var fakerFirstName = faker.name.firstName();
var fakerLastName = faker.name.lastName();
var fakerImage = faker.image.avatar();
var fakerNumber = faker.random.number();

describe('Create Gradebook', () => {

  beforeEach(() => {
    cy.visit('/')
    signInPage.signIn(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('Gradebooks')
    cy.wait('@Gradebooks')
    professorPage.ProfessorLink.click()
    professorPage.createProfessorLink.click()
  })

  it('GB-702 : Create Professor - page layout', () => {
    professorPage.firstName.should('be.visible')
    professorPage.lastName.should('be.visible')
    professorPage.imgBtn.should('be.visible')
    professorPage.submit.should('be.visible')
  })

  it('GB-703 : Create Professor successfully', () => {
    professorPage.createProfessor(fakerFirstName, fakerLastName, fakerImage)
    cy.get('.h3').contains('All Professors Page').should('be.visible')
  })

  it('GB-704 : Create Professor unsuccessfully - first name empty', () => {
    professorPage.createProfessor('', fakerLastName, fakerImage)
    professorPage.firstName.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })    
  })

  it('GB-705 : Create Professor unsuccessfully - last name empty', () => {
    professorPage.createProfessor(fakerFirstName, '', fakerImage)
    professorPage.lastName.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
      })    
  })

  it('GB-706 : Create Professor unsuccessfully - first name numbers', () => {
    professorPage.createProfessor(fakerNumber, fakerLastName, fakerImage)
    cy.wait(4000)
    cy.get('h3').contains('Create Professor').should('be.visible')
  })

  it('GB-707 : Create Professor unsuccessfully - last name numbers', () => {
    professorPage.createProfessor(fakerFirstName, fakerNumber, fakerImage)
    cy.wait(4000)
    cy.get('h3').contains('Create Professor').should('be.visible')
  })

})

