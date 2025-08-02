describe("Visual regression tests", function () {
  beforeEach(() => {
    // Wait for any fonts and images to load
    cy.visit("/");
    cy.get("body").should("be.visible");

    // Wait for any potential lazy-loaded content
    cy.wait(1000);
  });

  it("Loads the homepage and takes Percy snapshot", function () {
    // Take a full page snapshot
    cy.percySnapshot("Homepage - Full page", {
      percyCSS: `
        /* Ensure consistent rendering */
        * {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `,
    });
  });

  it("Takes mobile viewport snapshot", function () {
    cy.viewport(375, 667);
    cy.percySnapshot("Homepage - Mobile", {
      widths: [375],
    });
  });

  it("Takes tablet viewport snapshot", function () {
    cy.viewport(768, 1024);
    cy.percySnapshot("Homepage - Tablet", {
      widths: [768],
    });
  });

  it("Takes desktop viewport snapshot", function () {
    cy.viewport(1440, 900);
    cy.percySnapshot("Homepage - Desktop", {
      widths: [1440],
    });
  });
});
