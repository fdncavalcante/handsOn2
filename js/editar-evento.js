const form = document.querySelector("form");

//outro jeito de fazer: window.location.search, mas aí vai retornar a string '?id=23752356291'
const id = (new URL(document.location)).searchParams.get("id");

window.addEventListener('load', async () => {

  try {
    const evento = await buscarEvento(id)
    objParaForm(evento,form);

  } catch (error) {
    console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
    alert("erro ao carregar os dados deste evento");
    window.location.replace("admin.html");
  }

})

form.onsubmit = async (e) => {
  e.preventDefault();
  try {
    //!tentar usar return
    const eventoEditado = {};

    formParaObj(form,eventoEditado);
    editarOuExcluir(id,"editar",eventoEditado)
   
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
  }
};