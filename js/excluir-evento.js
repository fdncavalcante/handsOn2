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
      inputData.value = `${dataHora.slice(8,10)}/${dataHora.slice(5,7)}/${dataHora.slice(0,4)} ${dataHora.slice(11,16)}`
      inputLotacao.value = evento.number_tickets;

    } catch(error){
      console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
      alert("erro ao carregar os dados deste evento");
    }
    
  }
  
})

form.onsubmit = async (e) => {
  e.preventDefault();
  const id = (new URL(document.location)).searchParams.get("id");
  console.log(id);
  if (id) {
    try {
      await fetch(`${BASE_URL}/events/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      alert("deleção feita com sucesso");
      window.location.replace("admin.html")
    } catch(error){
      console.error("erro na deleção.Causa do erro: ", error);
      alert("erro na deleção.Cheque o console para a causa do erro");
    }
    
  }
}
