const registerdata = require("../fixtures/registerData.json");

describe("Buscar agendamentos", () => {
  Cypress.Commands.add("criarAgendamento", (dados) => {
    return cy.request({
      method: "POST",
      url: "https://restful-booker.herokuapp.com/booking",
      headers: {
        "Content-Type": "application/json"
      },
      body: dados
    });
  });

  Cypress.Commands.add("buscarAgendamento", (id) => {
    return cy.request({
      method: "GET",
      url: `https://restful-booker.herokuapp.com/booking/${id}`,
      failOnStatusCode: false
    });
    
  });

  Cypress.Commands.add("buscarListaDeAgendamentos", () => {
    return cy.request({
      method: "GET",
      url: "https://restful-booker.herokuapp.com/booking",
      failOnStatusCode: false
    });
  });

  Cypress.Commands.add("buscarAgendamentoAleatorio", () => {
    return cy.buscarListaDeAgendamentos().then((response) => {
      expect(response.status).to.equal(200);
      const listaIds = response.body;

      if (listaIds.length === 0) {
        cy.log("Nenhum agendamento encontrado");
        return null;
      }

      const idAleatorio = listaIds[Math.floor(Math.random() * listaIds.length)].bookingid;
      return cy.buscarAgendamento(idAleatorio);
    });
  });

  it("Deve criar e buscar agendamento com sucesso", () => {
    cy.criarAgendamento(registerdata).then((postResponse) => {
      expect(postResponse.status).to.equal(200);
      expect(postResponse.body).to.have.property("bookingid");

      const bookingId = postResponse.body.bookingid;

      cy.buscarAgendamento(bookingId).then((getResponse) => {
        expect(getResponse.status).to.equal(200);
        expect(getResponse.body).to.be.an("object");
        expect(getResponse.body.firstname).to.equal(registerdata.firstname);
        expect(getResponse.body.lastname).to.equal(registerdata.lastname);
      });
    });
  });

  it("Deve buscar um agendamento aleatório da lista", () => {
    cy.buscarListaDeAgendamentos().then((response) => {
      expect(response.status).to.equal(200);
      const listaIds = response.body;

      if (listaIds.length > 0) {
        const idAleatorio = listaIds[Math.floor(Math.random() * listaIds.length)].bookingid;

        cy.buscarAgendamento(idAleatorio).then((getResponse) => {
          expect(getResponse.status).to.equal(200);
          expect(getResponse.body).to.be.an("object");
        });
      } else {
        cy.log("Nenhum agendamento disponível para busca.");
      }
    });
  });

  it("Deve buscar um agendamento aleatório usando comando direto", () => {
    cy.buscarAgendamentoAleatorio().then((response) => {
      if (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("object");
      } else {
        cy.log("Nenhum agendamento encontrado.");
      }
    });
  });

  it("Deve buscar agendamento inexistente e receber erro 404", () => {
    const invalidBookingId = "999999";

    cy.buscarAgendamento(invalidBookingId).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body).to.equal("Not Found");
    });
  });
});
