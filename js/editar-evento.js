//! primeira parte igualzinha ao "excluir evento", refatorar
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner")
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const form = document.querySelector("main > div:nth-child(2) > form");

window.addEventListener('load', async () => {
  const id = (new URL(document.location)).searchParams.get("id");
  console.log(id);

  if (id) {
    try {
      const resposta = await fetch(`${BASE_URL}/events/${id}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const evento = await resposta.json();
      console.log(evento)

      inputNome.value = evento.name;
      inputBanner.value = evento.poster;
      inputAtracoes.value = evento.attractions;
      inputDescricao.value = evento.description;
      const dataHora = evento.scheduled;
      inputData.value = `${dataHora.slice(8,10)}/${dataHora.slice(5,7)}/${dataHora.slice(2,4)} ${dataHora.slice(11,16)}`
      inputLotacao.value = evento.number_tickets;

    } catch(error){
      console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
      alert("erro ao carregar os dados deste evento");
    }
    
  }
  
})

//!muito parecido com o cadastrar evento. Refatorar
form.onsubmit = async (e) => {
  e.preventDefault();

  const id = (new URL(document.location)).searchParams.get("id");

  const rawDate = inputData.value
  const splitDateTime = rawDate.split(" ");
  const splitDate = splitDateTime[0].split("/");
  const splitTime = splitDateTime[1].split(":");
  const date = new Date(20 + splitDate[2], splitDate[1] - 1, splitDate[0] - 1, splitTime[0], splitTime[1])
  console.log(date)
  const formattedDate = date.toISOString()
  
  try {
  const novoEvento = {
    "name": inputNome.value,
    "poster": inputBanner.value,
    "attractions": inputAtracoes.value.split(", "),
    "description": inputDescricao.value,
    "scheduled": formattedDate,
    "number_tickets": inputLotacao.value,
  };

  const options = {
    method: "PUT",
    body: JSON.stringify(novoEvento),
    headers: {
      "Content-Type": "application/json",
    },
  };

  
    const resposta = await fetch(`${BASE_URL}/events/`+id, options);
    const conteudoResposta = await resposta.json();
    console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

    alert("seu evento foi atualizado com sucesso!")
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
    alert("Ops! Algo deu errado na atualização deste evento...");
  }
};