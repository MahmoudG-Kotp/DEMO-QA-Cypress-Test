class User {
    #firstName;
    #lastName;
    #email;
    #age;
    #salary;
    #department;

    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        this.#age = value;
    }

    get salary() {
        return this.#salary;
    }

    set salary(value) {
        this.#salary = value;
    }

    get department() {
        return this.#department;
    }

    set department(value) {
        this.#department = value;
    }
}

class P02_WebTableForm {
    static entered_user = new User();

    constructor() {
        this.first_name_input_field = '#firstName';
        this.last_name_input_field = '#lastName';
        this.email_input_field = '#userEmail';
        this.age_input_field = '#age';
        this.salary_input_field = '#salary';
        this.department_input_field = '#department';
        this.submit_button = '#submit';
        this.interval = 50;
    }

    enterFirstName(firstname) {
        cy.get(this.first_name_input_field).type(firstname, { delay: this.interval });
        P02_WebTableForm.entered_user.firstName = firstname;
    }

    enterLastName(lastname) {
        cy.get(this.last_name_input_field).type(lastname, { delay: this.interval });
        P02_WebTableForm.entered_user.lastName = lastname;
    }

    enterEmail(email) {
        cy.get(this.email_input_field).type(email, { delay: this.interval });
        P02_WebTableForm.entered_user.email = email;
    }

    enterAge(age) {
        cy.get(this.age_input_field).type(age, { delay: this.interval });
        P02_WebTableForm.entered_user.age = age;
    }

    enterSalary(salary) {
        cy.get(this.salary_input_field).type(salary, { delay: this.interval });
        P02_WebTableForm.entered_user.salary = salary;
    }

    enterDepartment(department) {
        cy.get(this.department_input_field).type(department, { delay: this.interval });
        P02_WebTableForm.entered_user.department = department;
    }

    clickSubmitButton() {
        cy.get(this.submit_button).click();
    }

    static getEnteredUser() {
        return P02_WebTableForm.entered_user;
    }

    getDataFromTable(firstName) {
        return new Cypress.Promise((resolve) => {
            let foundData = null;
            cy.get('.rt-tr-group>.rt-tr>.rt-td:nth-child(1)').each(($el, index) => {
                const currentFirstName = $el.text().trim();
    
                if (currentFirstName === firstName) {
                    cy.get(`.rt-tr-group>.rt-tr`).eq(index).within(() => {
                        cy.get('.rt-td').then(($cells) => {
                            foundData = {
                                firstName: $cells.eq(0).text().trim(),
                                lastName: $cells.eq(1).text().trim(),
                                age: parseInt($cells.eq(2).text().trim()),
                                email: $cells.eq(3).text().trim(),
                                salary: parseInt($cells.eq(4).text().trim()),
                                department: $cells.eq(5).text().trim(),
                            };
                            resolve(foundData);
                        });
                    });
                    return false; // Exit the loop early
                }
            }).then(() => {
                if (!foundData) {
                    resolve(null); // Resolve as null if no match found
                }
            });
        });
    }

    compareEnteredWithFoundData() {
        const enteredUserData = P02_WebTableForm.getEnteredUser();
    
        return this.getDataFromTable(enteredUserData.firstName).then((foundData) => {
            if (!foundData) {
                return false; // No match found
            }
    
            const isMatch =
                foundData.firstName === enteredUserData.firstName &&
                foundData.lastName === enteredUserData.lastName &&
                foundData.email === enteredUserData.email &&
                foundData.age === enteredUserData.age &&
                foundData.salary === enteredUserData.salary &&
                foundData.department === enteredUserData.department;
    
            // Log comparison results
            cy.log(
                `Comparison Results:
                Found First Name: ${foundData.firstName} | Entered First Name: ${enteredUserData.firstName} | Match: ${foundData.firstName === enteredUserData.firstName}
                Found Last Name: ${foundData.lastName} | Entered Last Name: ${enteredUserData.lastName} | Match: ${foundData.lastName === enteredUserData.lastName}
                Found Email: ${foundData.email} | Entered Email: ${enteredUserData.email} | Match: ${foundData.email === enteredUserData.email}
                Found Age: ${foundData.age} | Entered Age: ${enteredUserData.age} | Match: ${foundData.age === enteredUserData.age}
                Found Salary: ${foundData.salary} | Entered Salary: ${enteredUserData.salary} | Match: ${foundData.salary === enteredUserData.salary}
                Found Department: ${foundData.department} | Entered Department: ${enteredUserData.department} | Match: ${foundData.department === enteredUserData.department}`
            );
    
            return isMatch;
        });
    }
}

export { P02_WebTableForm, User };
