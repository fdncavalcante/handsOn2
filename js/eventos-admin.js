const tBody = document.querySelector("tbody");
const reserveTicketButton = document.querySelectorAll(".btn-ticket");
const modalBackdrop = document.querySelector(".backdrop-reserve-ticket-modal");
const closeTicketModal = document.querySelector(".ticket-modal-close-icon");
const reservesList = document.querySelector(".reserves-list");


window.addEventListener('load', async () => {
  const respostaJSON = await listarEventos();

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
    btnReservas.setAttribute("href", "#here")
    tdBotoes.appendChild(btnReservas);

    btnReservas.addEventListener("click", async function (e) {
      e.preventDefault();
      abrirModal(evento._id);
      await listarReservas();
    });

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
});

closeTicketModal.addEventListener("click", fecharModal);


function abrirModal(id) {
  //mostrar modal
  modalBackdrop.classList.remove("hidden");

  //fechar visualização no modal
  let posicaoModal = closeTicketModal.getBoundingClientRect().top + window.scrollY
  window.scroll({
   top: posicaoModal - 50,
  })
  setTimeout(() => {
    window.onscroll = () => {
      window.scroll({
        top: posicaoModal - 50,
      })
    }
  }, 1000);

  //passar id para a url
  history.replaceState({
    id: 'lista de reservas',
    source: 'web'
  }, 'Sound Garden', "admin.html?id=" + id);
}

function fecharModal() {
  //esconder modal
  modalBackdrop.classList.add("hidden");
  
  //limpar conteúdo
  for (child of reservesList.children) {
    reservesList.removeChild(child);
  }
  window.onscroll = () => {};
}

async function listarReservas() {
  const id = new URL(document.location).searchParams.get("id");
  const reservas = await buscarReservas(id)

  if (reservas.length > 0) {
    for (let i = 0; i < reservas.length; i++) {
      const reserva = reservas[i];

      const userReserve = document.createElement("div");
      userReserve.classList.add("user-reserve");

      const ownerName = document.createElement("b");
      ownerName.textContent = "Nome do participante";
      const ownerNameContent = document.createElement("span");
      ownerNameContent.textContent = reserva.owner_name;

      const ownerEmail = document.createElement("b");
      ownerEmail.textContent = "Email do participante";
      const ownerEmailContent = document.createElement("span");
      ownerEmailContent.textContent = reserva.owner_email;

      const ownerTickets = document.createElement("b");
      ownerTickets.textContent = "Número de ingressos";
      const ownerTicketsContent = document.createElement("span");
      ownerTicketsContent.textContent = `${reserva.number_tickets}`;

      const userSeparation = document.createElement("hr");
      userSeparation.style.display = "block";

      userReserve.append(
        ownerName,
        ownerNameContent,
        ownerEmail,
        ownerEmailContent,
        ownerTickets,
        ownerTicketsContent,
        userSeparation,
      );
      reservesList.appendChild(userReserve);
    }
  } else {
    const nenhumaReserva = document.createElement("b");
    nenhumaReserva.textContent = "Ainda não há nenhuma reserva para este evento";
    reservesList.appendChild(nenhumaReserva);
  }

}