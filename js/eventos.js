const modalBackdrop = document.querySelector(".backdrop-reserve-ticket-modal");
const closeTicketModal = document.querySelector(".ticket-modal-close-icon");

//MODAL
const inputNome = document.querySelector("#name-input");
const inputEmail = document.querySelector("#email-input");
const inputIngressos = document.querySelector("#tickets-input");
const formModal = document.querySelector("#here > form")


closeTicketModal.addEventListener("click", function () {
  window.onscroll = () => {}
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
  const divMae = document.querySelector("body > main > section:nth-child(2) > div.container.d-flex.justify-content-center.align-items-center.flex-wrap")
  console.log(divMae)
  for (let i = 0; i < eventosPorData.length; i++) {
    const evento = eventosPorData[i];

    const dataRaw = new Date(evento.scheduled);
    const data = `${dataRaw.getDate()}/${dataRaw.getMonth() + 1}/${dataRaw.getFullYear()}`;

    //cards
    const card = document.createElement("article");
    card.className = "evento card p-5 m-3";
    divMae.appendChild(card);

    //h2
    const tituloCard = document.createElement("h2");
    tituloCard.innerHTML = `${evento.name} - ${data}`
    card.appendChild(tituloCard);

    //h4
    const atracoesCard = document.createElement("h4");
    atracoesCard.innerHTML = evento.attractions;
    card.appendChild(atracoesCard);

    //p
    const descricaoCard = document.createElement("p");
    descricaoCard.innerHTML = evento.description;
    card.appendChild(descricaoCard);

    //a
    const botaoCard = document.createElement("a");
    botaoCard.className = "btn btn-primary btn-ticket"
    botaoCard.innerHTML = "reservar ingresso";
    botaoCard.href = "#here";
    card.appendChild(botaoCard);

    card.querySelector("a").addEventListener('click', () => {
      formModal.setAttribute("id", `${evento._id}`)
      modalBackdrop.classList.remove("hidden");
      console.log(formModal.id)
      let posicaoModal = closeTicketModal.getBoundingClientRect().top + window.scrollY
      setTimeout(() => {
        window.onscroll = () => {
          window.scroll({
            top: posicaoModal - 50,
          })
        }
      }, 1000);
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

    formParaObj(formModal, novaReserva);

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