export default class GradebookPage {

    get createGradebookLink(){
        return cy.get('.nav-link').contains('Create Gradebook')
    }

    get gradebookTitle(){
        return cy.get('#title')
    }

    get professor(){
        return cy.get('select[name=professor] > option')
    }

    get submit(){
        return cy.get('.btn-primary').contains('Submit')
    }

    createGradebook(gradeBookName, gradeBookProfessor){
        if(gradeBookName){this.gradebookTitle.type(gradeBookName)}
        if(gradeBookProfessor){this.professor.eq(0).then(element => cy.get('select[name=professor]').select(element.val()))}
        this.submit.click()
    }

}

export const gradebookPage = new GradebookPage()