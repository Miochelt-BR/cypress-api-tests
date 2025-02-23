describe("Buscar agendamentos", () => {
  
  it("Deve buscar agendamento com sucesso", () => {
    cy.request({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking/664"
    }).then((response) => {
      expect(response.status).to.equal(200); 
      
      
    });
  });

});
