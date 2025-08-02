describe("Visual regression tests", function () {
  it("Loads the homepage and takes Percy snapshot", function () {
    // Load the homepage
    cy.visit("/");

    // Wait for the page to be fully loaded
    cy.get("body").should("be.visible");

    // Take a snapshot for visual diffing
    cy.percySnapshot("Homepage", { widths: [360, 768, 1440] });
  });
});
