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
