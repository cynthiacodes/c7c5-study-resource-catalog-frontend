describe("Test the landing page", () => {
    it("Visits the Study Resource Catalog", () => {
        cy.visit("https://study-resource-catalog-c7c5.netlify.app/");
    });
});

describe("Find username in the drop down option ", () => {
    it('finds the username "Cynthia"', () => {
        cy.visit("https://study-resource-catalog-c7c5.netlify.app/");

        cy.contains("Cynthia");
    });
});

describe("Testing see more button ", () => {
    it("To find see more button", () => {
        cy.visit("https://study-resource-catalog-c7c5.netlify.app/");

        cy.get("button").should("contain", "See more");
    });
});

describe("Testing sign in button ", () => {
    it("To test if sign in button is clickable", () => {
        cy.visit("https://study-resource-catalog-c7c5.netlify.app/");

        cy.get("button").should("contain", "Sign in").click();
    });
});
