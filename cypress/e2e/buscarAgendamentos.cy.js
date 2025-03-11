/// /// <reference types="cypress" />

const registerdata= require("../fixtures/registerData.json")

describe("Buscar agendamentos", () => {
 
  it("Deve criar e buscar agendamento com sucesso", () => {
    cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json"
      },
      body: registerdata,
    }).then((postResponse) => {
      expect(postResponse.status).to.equal(200);
      expect(postResponse.body).to.have.property("bookingid");

      const bookingId = postResponse.body.bookingid; // Captura o ID criado

      
      cy.request({
        method: "GET",
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body).to.be.an("object");
        expect(getResponse.body.firstname).to.equal("Thiago");
        expect(getResponse.body.lastname).to.equal("Brown");
      });
    });
  });

  it("Deve buscar agendamento sem sucesso", () => {
    const invalidBookingId = '999999'; 

    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${invalidBookingId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.equal("Not Found"); 
    });
  });

});
