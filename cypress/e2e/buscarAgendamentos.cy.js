/// <reference types="cypress" />

describe("Buscar agendamentos", () => {
  
  it("Deve buscar agendamento com sucesso", () => {
    const bookingId = '33'; 

    cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(200);


      expect(response.body).to.be.an("object");
     

      
    });
  });

});
