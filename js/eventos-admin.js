const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const tBody = document.querySelector("tbody");
const reserveTicketButton = document.querySelectorAll(".btn-ticket");
const modalBackdrop = document.querySelector(".backdrop-reserve-ticket-modal");
const closeTicketModal = document.querySelector(".ticket-modal-close-icon");
// const ticketModal = document.querySelector(".reserve-ticket-modal");

//const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

for (let btn of reserveTicketButton) {
  btn.addEventListener("click", function () {
    modalBackdrop.classList.remove("hidden");
  });
}

closeTicketModal.addEventListener("click", function () {
  modalBackdrop.classList.add("hidden");
});

const listaEventos = async () => {
  const resposta = await fetch(`${BASE_URL}/events`);
  const respostaJSON = await resposta.json();
  for (let i = 0; i < respostaJSON.length; i++) {
    const evento = respostaJSON[i];

    //tr
    const tr = document.createElement("tr");
    tBody.appendChild(tr);

    //th
    const th = document.createElement("th");
    th.innerHTML = i + 1;
    th.setAttribute("scope", "row");
    tr.appendChild(th);
    const dataHora = evento.scheduled;

    //tdDataHora
    const tdDataHora = document.createElement("td");
    tdDataHora.innerHTML = `${dataHora.slice(8, 10)}/${dataHora.slice(
      5,
      7
    )}/${dataHora.slice(0, 4)} ${dataHora.slice(11, 16)}`;
    tr.appendChild(tdDataHora);

    //tdTitulo
    const tdTitulo = document.createElement("td");
    tdTitulo.innerHTML = evento.name;
    tr.appendChild(tdTitulo);

    //tdAtracoes
    const tdAtracoes = document.createElement("td");
    tdAtracoes.innerHTML = evento.attractions;
    tr.appendChild(tdAtracoes);

    //tdBotoes
    const tdBotoes = document.createElement("td");
    tr.appendChild(tdBotoes);

    //btnReservas
    const btnReservas = document.createElement("a");
    btnReservas.setAttribute("class", "btn btn-dark");
    btnReservas.innerHTML = "ver reservas";
    tdBotoes.appendChild(btnReservas);

    //btnEditar
    const btnEditar = document.createElement("a");
    btnEditar.setAttribute("class", "btn btn-secondary");
    btnEditar.setAttribute("href", "editar-evento.html?id=" + evento._id);
    btnEditar.innerHTML = "editar";
    btnEditar.style.marginLeft = "3px";
    tdBotoes.appendChild(btnEditar);

    //btnExcluir
    const btnExcluir = document.createElement("a");
    btnExcluir.setAttribute("class", "btn btn-danger");
    btnExcluir.setAttribute("href", "excluir-evento.html?id=" + evento._id);
    btnExcluir.innerHTML = "excluir";
    btnExcluir.style.marginLeft = "3px";
    tdBotoes.appendChild(btnExcluir);
  }
};

listaEventos();
