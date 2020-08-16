export default class ProfessorPage {

    get ProfessorLink(){
        return cy.get('.nav-link').contains('Professors')
    }

    get createProfessorLink(){
        return cy.get('.dropdown-item').contains('Create Professor')
    }

    get firstName(){
        return cy.get('#firstName')
    }

    get lastName(){
        return cy.get('#lastName')
    }

    get imgBtn(){
        return cy.get('.btn-primary').contains('Add images')
    }

    get addImage(){
        return cy.get('[name=image_NaN]')
    }

    get submit(){
        return cy.get('.btn-primary').contains('Submit')
    }

    createProfessor(professorFirstName, professorLastName, professorImage){
        if(professorFirstName){this.firstName.type(professorFirstName)}
        if(professorLastName){this.lastName.type(professorLastName)}
        if(professorImage){this.imgBtn.click()}
        if(professorImage){this.addImage.type(professorImage)}
        this.submit.click()
    }

}

export const professorPage = new ProfessorPage()