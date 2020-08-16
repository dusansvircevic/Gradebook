export default class RegisterPage {

    get firstName(){
        return cy.get('#firstName')
    }

    get lastName(){
        return cy.get('#lastName')
    }

    get password(){
        return cy.get('#password')
    }

    get passwordConfirmation(){
        return cy.get('#passwordConfirmation')
    }

    get email(){
        return cy.get('#email')
    }

    get checkBox(){
        return cy.get('#termsAndConditions')
    }

    get submit(){
        return cy.get('[type=submit]').contains('Submit')
    }

    register(userFirstName, userLastName, userPassword, userPasswordConfirmation, userEmail){
        if(userFirstName){this.firstName.type(userFirstName)}
        if(userLastName){this.lastName.type(userLastName)}
        if(userPassword){this.password.type(userPassword)}
        if(userPasswordConfirmation){this.passwordConfirmation.type(userPasswordConfirmation)}
        if(userEmail){this.email.type(userEmail)}
        this.submit.click()
    }

    get signInLink(){
        return cy.get('.nav-link').contains('Sign in')
    }

    get signOutLink(){
        return cy.get('.nav-link').contains('Sign out')
    }

}

export const registerPage = new RegisterPage()