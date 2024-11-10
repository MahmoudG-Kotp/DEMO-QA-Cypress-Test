import 'cypress-file-upload';
import {P03_PracticeForm} from '../pages/P03_PracticeForm.js';
import {P01_Home, CardType} from '../pages/P01_Home.js';

const home_page = new P01_Home();
const practice_form = new P03_PracticeForm();

describe('As a user, I can submit new form', () => {
  before(() => {
    Cypress.on('uncaught:exception', () => {
      return false; // Prevent uncaught exceptions from failing the test
    });
  });

  it('Given valid data is entered into the form, then form would be submitted successfully', () => {
    // Given: Visit the home page
    cy.log('Given: Visit the home page');
    cy.visit(home_page.home_url);

    // When: Navigate to Web Tables and add data
    cy.log('When: Click on the "Forms" card');
    home_page.clickCard(CardType.Forms)
    
    cy.log('And: Click on the "Practice Form" category');
    home_page.clickPracticeFormCategory();

    cy.log('And: Enter valid data in the form');
    practice_form.enterFirstName('Mahmoud');
    practice_form.enterLastName('Gamal');
    practice_form.enterEmail('test@test.com');
    practice_form.selectGender('male'); 
    practice_form.enterUserNumber('0123456789');
    practice_form.enterDateOfBirth(15, 1, 1992);
    practice_form.enterSubjects(['Computer science']);
    practice_form.selectHobby(['reading']);
    practice_form.uploadPicture('Profile-pic2.png');
    practice_form.enterCurrentAddress('Iran');
    practice_form.selectState('NCR');
    practice_form.selectCity('Delhi');

    cy.log('And: Submit the form');
    practice_form.clickSubmitButton();

    // Then: Verify that the entered data is displayed in the table
    cy.log('Then: The data should be displayed in the table');
    practice_form.compareEnteredWithFoundDataForPracticeForm().then((isMatch) => {
      // Assert based on whether data was found and matched
      if (isMatch) {
        cy.log('Test case succeeded: Entered and found data matched.');
      } else {
        cy.log('Test case failed: Entered and found data did not match!!.');
      }
      expect(isMatch).to.be.true; 
    });
    
    cy.log('And: Click close button');
    practice_form.clickCloseButton();


  });
});
