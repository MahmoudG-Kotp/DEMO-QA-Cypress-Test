# Cypress Test Automation Project for Form Submission and Web Table Management

This project automates the testing of two core functionalities in a web application using Cypress:

1. **Practice Form Submission**: Automates the steps for submitting a user form with various fields, including personal details, subject selection, hobby choice, and file upload, and then verifies if the entered data is displayed correctly after submission.

2. **Web Table Data Entry and Verification**: Automates the process of adding new user data into a web table and verifying that the data appears accurately in the table.

## Project Overview

This Cypress test suite is organized into multiple page objects to streamline interaction with different elements of the application. The project follows a `Given-When-Then` format for tests, ensuring each test scenario is clear and aligned with the functionality under test.

## Key Features

- **Page Object Model (POM)**: Organized code with POM structure for reusable, maintainable test code.
- **File Upload and Data Verification**: Automated testing includes file upload functionality and verification of entered data for the Practice Form and Web Table.
- **Robust Test Flow**: Handles uncaught exceptions to prevent test interruptions.
- **Reusable Custom Commands**: Includes custom commands and helpers for form filling, button clicks, and data matching for improved readability.

## Technologies Used

- **Cypress**: The primary framework for end-to-end testing.
- **JavaScript**: For writing test scripts and custom commands.
- **Cypress File Upload Plugin**: Facilitates file uploads during form testing.

## Project Structure

- **Pages**: Contains page objects for different sections of the application:
  - `P01_Home.js`: Defines interactions with the home page and navigation.
  - `P02_WebTableForm.js`: Contains functions to interact with the web table form.
  - `P03_PracticeForm.js`: Contains functions to interact with the practice form.
- **Tests**:
  - **Practice Form Test**: Verifies form submission with detailed field entry and data matching.
  - **Web Table Test**: Validates the process of adding new data to a web table and checks data integrity.

## Running the Tests

To run these tests locally, follow these steps:

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Execute tests with `npx cypress open` or `npx cypress run`.

## Usage

This project can be used as a starting point for automating form-based applications with Cypress. It demonstrates best practices in structuring and handling complex form input and data verification.

## Contributions

Feel free to submit pull requests or report issues to improve the project further.

## [Output](https://youtu.be/bGEgBnW1Y0I?si=371k8vAl5i3sIGUn)
![DemoQACypressTest-ezgif com-crop](https://github.com/user-attachments/assets/10eeef91-3aa6-422a-86da-dabfc36a6626)

