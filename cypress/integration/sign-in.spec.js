import {CREDENTIALS} from '../fixtures/constants'
import {signInPage} from '../page_object/sign-in.page'
import {randomEmail, randomPassword} from '../utils/'


describe('Sign in module', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/diaries?page=1').as('Gradebooks')
  })

  it('GB-102 : Sign in page layout', () => {
    signInPage.email.should('be.visible').click()
    signInPage.password.should('be.visible').click()
    signInPage.submit.should('be.visible').click()
  })

  it('GB-103 : Successful sign in', () => {
    signInPage.signIn(CREDENTIALS.EMAIL, CREDENTIALS.PASSWORD)
    cy.wait('@Gradebooks')
    signInPage.signOutLink.should('be.visible')    
  })

  it('GB-104 : Unsuccessful sign in - both credentials are wrong', () => {
    signInPage.signIn(randomEmail(), randomPassword(8))
    signInPage.signInLink.should('be.visible')
  })

  it('GB-105 : Unsuccessful sign in - email is wrong, password is correct', () => {
    signInPage.signIn(randomEmail(), CREDENTIALS.PASSWORD)
    signInPage.signInLink.should('be.visible')
  })

  it('GB-106 : Unsuccessful sign in - password is wrong, email is correct', () => {
    signInPage.signIn(CREDENTIALS.EMAIL, randomPassword(8))
    signInPage.signInLink.should('be.visible')
  }) 

  it('GB-109 : Unsuccessful sign in - password is wrong, email is correct', () => {
    signInPage.signIn(CREDENTIALS.EMAIL, randomPassword(8))
    signInPage.signInLink.should('be.visible')
  }) 

  it('GB-109 : Unsuccessful sign in - email input field is empty', () => {
    signInPage.signIn('', CREDENTIALS.PASSWORD)
    signInPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })    
  }) 

  it('GB-109 : Unsuccessful sign in - password input field is empty', () => {
    signInPage.signIn(CREDENTIALS.EMAIL, '')
    signInPage.password.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })    
  }) 

})