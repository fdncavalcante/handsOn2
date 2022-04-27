const card1 = document.querySelector("article:nth-child(1)");
const card2 = document.querySelector("article:nth-child(2)");
const card3 = document.querySelector("article:nth-child(3)");
const cards = [card1, card2, card3];
const reserveTicketButton = document.querySelectorAll(".btn-ticket");
const modalBackdrop = document.querySelector(".backdrop-reserve-ticket-modal");
const closeTicketModal = document.querySelector(".ticket-modal-close-icon");

//MODAL
const inputNome = document.querySelector("#name-input");
const inputEmail = document.querySelector("#email-input");
const inputIngressos = document.querySelector("#tickets-input");
const formModal = document.querySelector("#here > form")

for (let btn of reserveTicketButton) {
  btn.addEventListener("click", function () {
    modalBackdrop.classList.remove("hidden");
  });
}

closeTicketModal.addEventListener("click", function () {

  inputNome.disabled = false;
  inputEmail.disabled = false;
  inputIngressos.disabled = false;
  document.querySelector("form > button").style.display = "block";
  formModal.reset();
  document.querySelector("div.upper-ticket-modal > b").innerHTML = "Olá! Insira seus dados para reservar seu ingresso!"
  modalBackdrop.classList.add("hidden");
});

const proximosEventos = async () => {
  
  eventosPorData = await listarEventos(true);

  console.log(eventosPorData);

  for (let i = 0; i < 3; i++) {
    const evento = eventosPorData[i];
    const card = cards[i];

    const dataRaw = new Date(evento.scheduled);
    const data = `${dataRaw.getDate()}/${dataRaw.getMonth() + 1}/${dataRaw.getFullYear()}`;

    card.querySelector("h2").innerHTML = `${evento.name} - ${data}`;
    card.querySelector("h4").innerHTML = evento.attractions;
    card.querySelector("p").innerHTML = evento.description;


    card.querySelector("a").addEventListener('click', () => {
      formModal.setAttribute("id", `${evento._id}`)
      console.log(formModal.id)
    })
  }
};


//Reservar Ingressos
formModal.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const novaReserva = {
      "event_id": formModal.id,
    };

    formParaObj(formModal,novaReserva);

    const resposta = await reservarIngressos(novaReserva);

    document.querySelector("div.upper-ticket-modal > b").innerHTML = resposta
  } catch (error) {
    console.log(error);
    document.querySelector("div.upper-ticket-modal > b").innerHTML = resposta
  } finally {
    console.log("FINALLY")
    inputNome.disabled = true;
    inputEmail.disabled = true;
    inputIngressos.disabled = true;
    document.querySelector("form > button").style.display = "none";
  }
};