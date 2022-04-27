const inputNome = document.querySelector("#nome");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("main > div:nth-child(2) > form");

form.onsubmit = async (e) => {
  e.preventDefault();
  
  try {
  const novoEvento = {
    "name": inputNome.value,
    "poster": "https://picsum.photos/300",
    "attractions": inputAtracoes.value.split(", "),
    "description": inputDescricao.value,
    "scheduled": inputData.value,
    "number_tickets": inputLotacao.value,
  };

    await criarEvento(novoEvento);
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
  }
};