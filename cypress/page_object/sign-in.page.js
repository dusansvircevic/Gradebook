export default class SignInPage {
    get email(){
        return cy.get('[name=email]')
    }

    get password(){
        return cy.get('[name=password]')
    }

    get submit(){
        return cy.get('[type=submit]').contains('Login')
    }

    signIn(userEmail,userPassword){
        if(userEmail){this.email.type(userEmail)}
        if(userPassword){this.password.type(userPassword)}
        this.submit.click()
    }

    get signInLink(){
        return cy.get('.nav-link').contains('Sign in')
    }

    get signOutLink(){
        return cy.get('.nav-link').contains('Sign out')
    }

}

export const signInPage = new SignInPage()