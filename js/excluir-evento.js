const id = (new URL(document.location)).searchParams.get("id");

const form = document.querySelector("form");

window.addEventListener('load', async () => {

  if (id) {
    try {
      const evento = await buscarEvento(id)
      objParaForm(evento, form);

    } catch (error) {
      console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
      alert("erro ao carregar os dados deste evento");
      window.location.replace("admin.html");
    }

  }

})

form.onsubmit = async (e) => {
  e.preventDefault();

  if (id) {
    try {
      await editarOuExcluir(id,"excluir");
      //window.location.replace("admin.html")
    } catch (error) {
      console.error("erro na deleção.Causa do erro: ", error);
    }

  }
}