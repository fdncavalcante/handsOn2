const inputNome = document.querySelector("#nome");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const form = document.querySelector("main > div:nth-child(2) > form");

form.onsubmit = async (e) => {
  e.preventDefault();


  const rawDate = inputData.value
  const splitDateTime = rawDate.split(" ");
  const splitDate = splitDateTime[0].split("/");
  const splitTime = splitDateTime[1].split(":");
  const date = new Date("20" + splitDate[2], splitDate[1] - 1, splitDate[0] - 1, splitTime[0], splitTime[1])
  const formattedDate = date.toISOString()
  
  try {
  const novoEvento = {
    "name": inputNome.value,
    "poster": "https://picsum.photos/300",
    "attractions": inputAtracoes.value.split(", "),
    "description": inputDescricao.value,
    "scheduled": formattedDate,
    "number_tickets": inputLotacao.value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(novoEvento),
    headers: {
      "Content-Type": "application/json",
    },
  };

  
    const resposta = await fetch(`${BASE_URL}/events`, options);
    const conteudoResposta = await resposta.json();
    console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

    alert("seu evento foi adicionado com sucesso!")
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
    alert("Ops! Algo deu errado no cadastro deste evento...");
  }
};