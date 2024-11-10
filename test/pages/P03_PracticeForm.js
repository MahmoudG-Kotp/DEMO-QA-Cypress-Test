class PracticeForm {
    // Private fields for each form element
    #firstName;
    #lastName;
    #email;
    #gender;
    #userNumber;
    #dateOfBirthInput;
    #subjects;
    #hobbies;
    #uploadPicture;
    #currentAddress;
    #state;
    #city;

    constructor() {
        // Initialize fields to default empty values
        this.#gender = '';
        this.#hobbies = [];
    }

    // Getter and Setter for First Name
    get firstName() {
        return this.#firstName;
    }
    set firstName(value) {
        this.#firstName = value;
    }

    // Getter and Setter for Last Name
    get lastName() {
        return this.#lastName;
    }
    set lastName(value) {
        this.#lastName = value;
    }

    // Getter and Setter for Email
    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    // Getter and Setter for Gender
    get gender() {
        return this.#gender;
    }
    set gender(value) {
        const validGenders = ['male', 'female', 'other'];
        if (validGenders.includes(value.toLowerCase())) {
            this.#gender = value;
        } else {
            throw new Error("Invalid gender value");
        }
    }

    // Getter and Setter for User Number
    get userNumber() {
        return this.#userNumber;
    }
    set userNumber(value) {
        this.#userNumber = value;
    }

    // Getter and Setter for Date of Birth
    get dateOfBirthInput() {
        return this.#dateOfBirthInput;
    }
    
    setDateOfBirth(day, month, year) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const formattedDate = `${day} ${monthNames[month - 1]},${year}`;
        this.#dateOfBirthInput = formattedDate;
    }

    // Getter and Setter for Subjects
    get subjects() {
        return this.#subjects;
    }
    set subjects(value) {
        if (Array.isArray(value)) {
            this.#subjects = value;
        } else {
            throw new Error("Subjects must be an array");
        }
    }

    // Getter and Setter for Hobbies
    get hobbies() {
        return this.#hobbies;
    }
    set hobbies(value) {
        const validHobbies = ['sports', 'reading', 'music'];
        if (Array.isArray(value) && value.every(hobby => validHobbies.includes(hobby))) {
            this.#hobbies = value;
        } else {
            throw new Error("Invalid hobbies value");
        }
    }

    // Getter and Setter for Upload Picture
    get uploadPicture() {
        return this.#uploadPicture;
    }
    set uploadPicture(value) {
        this.#uploadPicture = value;
    }

    // Getter and Setter for Current Address
    get currentAddress() {
        return this.#currentAddress;
    }
    set currentAddress(value) {
        this.#currentAddress = value;
    }

    // Getter and Setter for State
    get state() {
        return this.#state;
    }
    set state(value) {
        this.#state = value;
    }

    // Getter and Setter for City
    get city() {
        return this.#city;
    }
    set city(value) {
        this.#city = value;
    }
}

class P03_PracticeForm {
    static entered_practice_form = new PracticeForm(); // Initialize static instance of PracticeForm

    constructor() {
        // Define selectors for each input field
        this.first_name_input_field = '#firstName';
        this.last_name_input_field = '#lastName';
        this.email_input_field = '#userEmail';
        this.gender_radio_group = {
            male: '#gender-radio-1',
            female: '#gender-radio-2',
            other: '#gender-radio-3'
        };
        this.user_number_input_field = '#userNumber';
        this.date_of_birth_input = '#dateOfBirthInput';
        this.subjects_input_field = '#subjectsInput';
        this.hobbies_checkbox = {
            sports: '#hobbies-checkbox-1',
            reading: '#hobbies-checkbox-2',
            music: '#hobbies-checkbox-3'
        };
        this.upload_picture_button = '#uploadPicture';
        this.current_address_input_field = '#currentAddress';
        this.state_dropdown = '#state';
        this.city_dropdown = '#city';
        this.submit_button = '#submit';
        this.close_button = "#closeLargeModal";
        this.interval = 50;
    }

    enterFirstName(firstName) {
        cy.get(this.first_name_input_field).type(firstName, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.firstName = firstName;
    }

    enterLastName(lastName) {
        cy.get(this.last_name_input_field).type(lastName, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.lastName = lastName;
    }

    enterEmail(email) {
        cy.get(this.email_input_field).type(email, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.email = email;
    }

    selectGender(gender) {
        cy.get(this.gender_radio_group[gender]).check({ force: true });
        P03_PracticeForm.entered_practice_form.gender = gender;
    }

    enterUserNumber(userNumber) {
        cy.get(this.user_number_input_field).type(userNumber, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.userNumber = userNumber;
    }

    enterDateOfBirth(day, month, year) {
        // Click the date input to open the date picker
        cy.get(this.date_of_birth_input).click();
    
        // Select the desired month from the month dropdown
        cy.get('.react-datepicker__month-select').select(month - 1); // Month is 0-based
        
        // Select the desired year from the year dropdown
        cy.get('.react-datepicker__year-select').select(year.toString());
        
        // Select the desired day from the days grid
        cy.get('.react-datepicker__month')
            .find('.react-datepicker__day')
            .contains(day)
            .click();
    
        // Store the selected date as day, month, year
        P03_PracticeForm.entered_practice_form.setDateOfBirth(day, month, year);
    }
    
    enterSubjects(subjects) {
        cy.get(this.subjects_input_field).type(`${subjects.join(', ')}{enter}`, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.subjects = subjects;
    }

    selectHobby(hobbies) {
        hobbies.forEach(hobby => {
            cy.get(this.hobbies_checkbox[hobby]).check({ force: true });
        });
        P03_PracticeForm.entered_practice_form.hobbies = hobbies;
    }

    uploadPicture(filePath) {
        cy.get(this.upload_picture_button).attachFile(filePath);
        P03_PracticeForm.entered_practice_form.uploadPicture = filePath;
    }

    enterCurrentAddress(address) {
        cy.get(this.current_address_input_field).type(address, { delay: this.interval });
        P03_PracticeForm.entered_practice_form.currentAddress = address;
    }

    selectState(state) {
        cy.get(this.state_dropdown).click();
        cy.get('input#react-select-3-input').type(`${state}{enter}`);
        P03_PracticeForm.entered_practice_form.state = state;
    }

    selectCity(city) {
        cy.get(this.city_dropdown).click();
        cy.get('input#react-select-4-input').type(`${city}{enter}`);
        P03_PracticeForm.entered_practice_form.city = city;
    }

    clickSubmitButton() {
        cy.get(this.submit_button).click();
    }

    clickCloseButton() {
        cy.get(this.close_button).scrollIntoView({ easing: 'linear', duration: 500, force: true }).click({ force: true });
    }

    static getEnteredPracticeForm() {
        return P03_PracticeForm.entered_practice_form;
    }

    compareEnteredWithFoundDataForPracticeForm() {
        const enteredPracticeFormData = P03_PracticeForm.getEnteredPracticeForm();

        return new Cypress.Promise((resolve) => {
            let foundData = {};

            // Iterate over each row and capture data
            cy.get('tbody > tr').each(($row) => {
                const label = $row.find('td').first().text().trim();
                const value = $row.find('td').eq(1).text().trim();

                // Map row labels to foundData fields
                switch (label) {
                    case 'Student Name':
                        foundData.studentName = value;
                        break;
                    case 'Student Email':
                        foundData.studentEmail = value;
                        break;
                    case 'Gender':
                        foundData.gender = value;
                        break;
                    case 'Mobile':
                        foundData.mobile = value;
                        break;
                    case 'Date of Birth':
                        foundData.dob = value;
                        break;
                    case 'Subjects':
                        foundData.subjects = value;
                        break;
                    case 'Hobbies':
                        foundData.hobbies = value;
                        break;
                    case 'Picture':
                        foundData.picture = value;
                        break;
                    case 'Address':
                        foundData.address = value;
                        break;
                    case 'State and City':
                        foundData.stateCity = value;
                        break;
                    default:
                        break;
                }
            }).then(() => {
                // Helper function to normalize strings (remove spaces and lowercase)
                const normalize = (str) => str.toLowerCase().replace(/\s+/g, '').trim();

                // Log all collected data at once
                cy.log(
                    `Comparison Results:
                     Found Student Name: ${foundData.studentName}, Expected: ${enteredPracticeFormData.firstName} ${enteredPracticeFormData.lastName}
                     Found Student Email: ${foundData.studentEmail}, Expected: ${enteredPracticeFormData.email}
                     Found Gender: ${foundData.gender}, Expected: ${enteredPracticeFormData.gender}
                     Found Mobile: ${foundData.mobile}, Expected: ${enteredPracticeFormData.userNumber}
                     Found Date of Birth: ${foundData.dob}, Expected: ${enteredPracticeFormData.dateOfBirthInput}
                     Found Subjects: ${foundData.subjects}, Expected: ${enteredPracticeFormData.subjects.join(', ')}
                     Found Hobbies: ${foundData.hobbies}, Expected: ${enteredPracticeFormData.hobbies.join(', ')}
                     Found Picture: ${foundData.picture}, Expected: ${enteredPracticeFormData.uploadPicture}
                     Found Address: ${foundData.address}, Expected: ${enteredPracticeFormData.currentAddress}
                     Found State and City: ${foundData.stateCity}, Expected: ${enteredPracticeFormData.state} ${enteredPracticeFormData.city}`
                );

                // Compare all collected data with expected values using normalized comparison
                const isMatch = 
                    normalize(foundData.studentName) === normalize(`${enteredPracticeFormData.firstName} ${enteredPracticeFormData.lastName}`) &&
                    normalize(foundData.studentEmail) === normalize(enteredPracticeFormData.email) &&
                    normalize(foundData.gender) === normalize(enteredPracticeFormData.gender) &&
                    normalize(foundData.mobile) === normalize(enteredPracticeFormData.userNumber) &&
                    normalize(foundData.dob) === normalize(enteredPracticeFormData.dateOfBirthInput) &&
                    normalize(foundData.subjects) === normalize(enteredPracticeFormData.subjects.join(', ')) &&
                    normalize(foundData.hobbies) === normalize(enteredPracticeFormData.hobbies.join(', ')) &&
                    normalize(foundData.picture) === normalize(enteredPracticeFormData.uploadPicture) &&
                    normalize(foundData.address) === normalize(enteredPracticeFormData.currentAddress) &&
                    normalize(foundData.stateCity) === normalize(`${enteredPracticeFormData.state} ${enteredPracticeFormData.city}`);

                // Resolve based on whether all comparisons matched
                resolve(isMatch);
            });
        });
    }
}

export default {P03_PracticeForm, PracticeForm};