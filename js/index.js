//!REFATORANDO
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
let reservasPorId;

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
    console.log("na função: " + eventosPorData);
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

//usado em editar
const editarEvento = async (id, eventoEditado = {}) => {
  try {
    const options = {
      method: "PUT",
      body: JSON.stringify(eventoEditado),
      headers: {
        "Content-Type": "application/json",
      },
    };


    console.log(eventoEditado)
    const resposta = await fetch(`${BASE_URL}/events/` + id, options);
    const conteudoResposta = await resposta.json();
    console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

    alert("seu evento foi atualizado com sucesso!")
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
    alert("Ops! Algo deu errado na atualização deste evento...");
  }
}

//usado em excluir
const excluirEvento = async (id) => {
  try {
    await fetch(`${BASE_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    alert("deleção feita com sucesso");
  } catch (error) {
    console.error("erro na deleção.Causa do erro: ", error);
    alert("erro na deleção.Cheque o console para a causa do erro");
  }
}

//usado em ver reservas
const buscarReservas = async (id_evento) => {
  const resposta = await fetch(`${BASE_URL}/bookings/event/${id_evento}`);
  const conteudoResposta = await resposta.json();
  console.log("🚀 / file: cadastro-evento.js / line 37 / form.onsubmit= / conteudoResposta", conteudoResposta);

  reservasPorId = conteudoResposta;
}