const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner")
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");

const id = (new URL(document.location)).searchParams.get("id");

const form = document.querySelector("main > div:nth-child(2) > form");

window.addEventListener('load', async () => {

  if (id) {
    try {
      const evento = await buscarEvento(id)

      inputNome.value = evento.name;
      inputBanner.value = evento.poster;
      inputAtracoes.value = evento.attractions;
      inputDescricao.value = evento.description;
      inputData.value = evento.scheduled.slice(0,-1);
      inputLotacao.value = evento.number_tickets;

    } catch(error){
      console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
      alert("erro ao carregar os dados deste evento");
    }
    
  }
  
})

form.onsubmit = async (e) => {
  e.preventDefault();

  if (id) {
    try {
      await excluirEvento(id);
      window.location.replace("admin.html")
    } catch(error){
      console.error("erro na deleção.Causa do erro: ", error);
    }
    
  }
}
