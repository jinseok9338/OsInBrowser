/// <reference types="cypress" />

context("Assertions", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/assertions");
  });

  describe("My First Test", () => {
    it("Does not do much!", () => {
      expect(true).to.equal(true);
    });
  });
});
