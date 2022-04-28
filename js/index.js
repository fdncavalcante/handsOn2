//!REFATORANDO
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

//usado em eventos, admin e landing-page
const listarEventos = async (ordem = false) => {
  const resposta = await fetch(`${BASE_URL}/events`);
  const respostaJSON = await resposta.json()

  if (ordem) {
    //não mostrar eventos que já passaram
    const eventosFuturos = respostaJSON.filter(
      (evento) => evento.scheduled >= new Date().toISOString()
    );

    //organizar eventos por data
    const eventosPorData = eventosFuturos.sort((a, b) => {
      if (a.scheduled > b.scheduled) {
        return 1;
      }
      if (a.scheduled < b.scheduled) {
        return -1;
      }
      return 0;
    });
    return eventosPorData;
  }
  return respostaJSON;
}

//usado em cadastrar e editar
const formParaObj = (form, obj) => {
  for (let i = 0; i < form.elements.length - 1; i++) {
    const input = form.elements[i]
    if (input.name == 'attractions') {
      obj[input.name] = input.value.split(", ");
    } else {
      obj[input.name] = input.value;
    }
  }
}
//usado em editar e excluir
const objParaForm = (obj, form) => {
  const keys = Object.keys(obj)
  obj.scheduled = obj.scheduled.slice(0, -1);

  for (let i = 0; i < form.elements.length - 1; i++) {
    const input = form.elements[i]

    for (let j = 0; j < keys.length; j++) {
      const key = keys[j]
      if (input.name == key) {
        input.value = obj[key]
      }
    }
  }
}

//usado em cadastro
const criarEvento = async (novoEvento = {}) => {
  try {
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
  } catch (error) {
    console.error(error);
    alert("Ops! Algo deu errado no cadastro deste evento...");
  }
}

//usado em editar e excluir
const buscarEvento = async (id) => {
  try {
    const resposta = await fetch(`${BASE_URL}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const evento = await resposta.json();
    console.log(evento)

    return evento;

  } catch (error) {
    console.error("erro ao carregar os dados deste evento. Causa do erro: ", error);
    alert("erro ao carregar os dados deste evento");
    return error;
  }
}

//usado em eventos e landing-page
const reservarIngressos = async (dadosReserva = {}) => {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(dadosReserva),
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(options.body)
    const resposta = await fetch(`${BASE_URL}/bookings`, options);
    const conteudoResposta = await resposta.json();
    console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

    return "seus ingressos foram reservados com sucesso!"
  } catch (error) {
    console.log(error);
    return "Ops! Algo deu errado na reserva do(s) seu(s) ingresso(s)..."
  };
}

const editarOuExcluir = async (id, acao, eventoEditado = {}) => {
  try {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (acao == "editar") {
      options.method = "PUT",
        options.body = JSON.stringify(eventoEditado)
    } else {
      options.method = "DELETE"
    }

    console.log(options);
    await fetch(`${BASE_URL}/events/` + id, options);

    alert(`seu evento foi ${acao.slice(0,-1)}do com sucesso!`);
    window.location.replace("admin.html")
  } catch (error) {
    alert(`erro ao ${acao}:\n ${error}`);
    console.log(error)
    window.location.replace("admin.html")
  }
}

//usado em ver reservas
const buscarReservas = async (id_evento) => {
  const resposta = await fetch(`${BASE_URL}/bookings/event/${id_evento}`);
  const conteudoResposta = await resposta.json();
  console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

  return conteudoResposta;
}