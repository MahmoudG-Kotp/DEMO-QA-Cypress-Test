class P01_Home {
    constructor() {
        this.home_url = 'https://demoqa.com/';
        this.web_tables_category = '#item-3';
        this.practice_form = "li[id='item-0']";
        this.add_new_data_button = '#addNewRecordButton';
    }

    // Method to dynamically select a card based on the provided index
    findCard(cardNumber) {
        return `div.card.mt-4.top-card:nth-of-type(${cardNumber})`;
    }

    // Click the specified card based on the enum value
    clickCard(cardNumber) {
        const cardSelector = this.findCard(cardNumber);
        cy.get(cardSelector).click();
        cy.url().should('include', cardNumber === CardType.Elements ? '/elements' : '/forms');
    }

    clickWebTablesCategory() {
        cy.get(this.web_tables_category).click();
        cy.url().should('include', '/webtables');
    }

    clickPracticeFormCategory() {
        cy.wait(1000);
        cy.get(this.practice_form).eq(1).click();
        cy.url().should('include', '/automation-practice-form');
    }

    clickAddNewDataButton() {
        cy.get(this.add_new_data_button).click();
    }
}

const CardType = {
    Elements: 1,
    Forms: 2
};

export { P01_Home, CardType };
