const id = (new URL(document.location)).searchParams.get("id");

const form = document.querySelector("form");

window.addEventListener('load', async () => {

  if (id) {
    try {
      const evento = await buscarEvento(id)
      const keys = Object.keys(evento)
      evento.scheduled = evento.scheduled.slice(0, -1);

      for (let i = 0; i < form.elements.length - 1; i++) {
        const input = form.elements[i]

        for (let j = 0; j < keys.length; j++) {
          const key = keys[j]
          if (input.name == key) {
            input.value = evento[key]
          }
        }
      }

    } catch (error) {
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
    } catch (error) {
      console.error("erro na deleção.Causa do erro: ", error);
    }

  }
}