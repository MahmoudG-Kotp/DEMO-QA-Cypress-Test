import { P02_WebTableForm } from '../pages/P02_WebTableForm.js';
import {P01_Home, CardType} from '../pages/P01_Home.js';

const home_page = new P01_Home();
const webtable_form = new P02_WebTableForm();

describe('As a user, I can enter new data into the table', () => {
  before(() => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });
  });

  it('Given valid data is entered into the web table, then the data should be displayed in the table', () => {
    // Given: Visit the home page
    cy.log('Given: Visit the home page');
    cy.visit(home_page.home_url);

    // When: Navigate to Web Tables and add data
    cy.log('When: Click on the "Elements" card');
    home_page.clickCard(CardType.Elements)
    
    cy.log('And: Click on the "Web Tables" category');
    home_page.clickWebTablesCategory();
    
    cy.log('And: Click on the "Add New Data" button');
    home_page.clickAddNewDataButton();

    cy.log('And: Enter valid data in the form');
    webtable_form.enterFirstName('LiLi');
    webtable_form.enterLastName('Kingstone');
    webtable_form.enterEmail('test@test.com');
    webtable_form.enterAge(30);
    webtable_form.enterSalary(12345);
    webtable_form.enterDepartment('QA');

    cy.log('And: Submit the form');
    webtable_form.clickSubmitButton();

    // Then: Verify that the entered data is displayed in the table
    cy.log('Then: The data should be displayed in the table');
    webtable_form.compareEnteredWithFoundData().then((isMatch) => {
      // Assert based on whether data was found and matched
      if (isMatch) {
        cy.log('Test case succeeded: Entered and found data matched.');
      } else {
        cy.log('Test case failed: Entered and found data did not match!!.');
      }
      expect(isMatch).to.be.true; // This will cause the test to fail if `isMatch` is false
    });
  });
});
