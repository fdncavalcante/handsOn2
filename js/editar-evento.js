//! primeira parte igualzinha ao "excluir evento", refatorar
const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner")
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const form = document.querySelector("form");

//outro jeito de fazer: window.location.search, mas aí vai retornar a string '?id=23752356291'
const id = (new URL(document.location)).searchParams.get("id");

window.addEventListener('load', async () => {

  try {
    const evento = await buscarEvento(id)

    inputNome.value = evento.name;
    inputBanner.value = evento.poster;
    inputAtracoes.value = evento.attractions;
    inputDescricao.value = evento.description;
    inputData.value = evento.scheduled.slice(0,-1)
    inputLotacao.value = evento.number_tickets;

  } catch (error) {
    console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
    alert("erro ao carregar os dados deste evento");
  }

})

//!muito parecido com o cadastrar evento. Refatorar
form.onsubmit = async (e) => {
  e.preventDefault();
  try {
    const eventoEditado = {};

    formParaObj(form,eventoEditado);
    editarEvento(id, eventoEditado);
   
    //window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
  }
};