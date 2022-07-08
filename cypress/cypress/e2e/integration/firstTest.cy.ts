/// <reference types="cypress" />

context("Assertions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("My First Test", () => {
    it("it searches the button", () => {
      expect(true).to.equal(true);
    });
  });
});
