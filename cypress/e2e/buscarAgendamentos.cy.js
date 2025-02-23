/// <reference types="cypress" />

describe("Buscar agendamentos", () => {
  
  it("Deve buscar agendamento com sucesso", () => {
    cy.request({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking/764",
     failOnStatusCode: false 
    }).as("getResultStatus");

    cy.get("@getResultStatus").then((response) => {
      console.log(response);
    });
  });

});
