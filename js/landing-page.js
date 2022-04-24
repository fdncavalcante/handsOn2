const card1 = document.querySelector("article:nth-child(1)")
const card2 = document.querySelector("article:nth-child(2)")
const card3 = document.querySelector("article:nth-child(3)")
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

//! muito parecido com demais listas de eventos. refatorar
const listaEventos = async () => {
  const resposta = await fetch(`${BASE_URL}/events`);
  const respostaJSON = await resposta.json();

  //não mostrar eventos que já passaram
  const eventosFuturos = respostaJSON.filter((evento) => 
    evento.scheduled > new Date().toISOString())

  console.log(eventosFuturos)
  const eventosPorData = eventosFuturos.sort((a,b) => {
    if(a.scheduled > b.scheduled){
      return 1;
    }
    if(a.scheduled < b.scheduled){
      return -1;
    }
    return 0
  })

  const data1Raw = new Date(eventosPorData[0].scheduled)
  const data1 = `${data1Raw.getDate()}/${data1Raw.getMonth()+1}/${data1Raw.getFullYear()}`
  const data2Raw = new Date(eventosPorData[1].scheduled)
  const data2 = `${data1Raw.getDate()}/${data1Raw.getMonth()+1}/${data1Raw.getFullYear()}`
  const data3Raw = new Date(eventosPorData[2].scheduled)
  const data3 = `${data1Raw.getDate()}/${data1Raw.getMonth()+1}/${data1Raw.getFullYear()}`

  card1.querySelector("h2").innerHTML = `${eventosPorData[0].name} - ${data1}`
  card2.querySelector("h2").innerHTML = `${eventosPorData[1].name} - ${data1}`
  card3.querySelector("h2").innerHTML = `${eventosPorData[2].name} - ${data1}`

  card1.querySelector("h4").innerHTML = eventosPorData[0].attractions
  card2.querySelector("h4").innerHTML = eventosPorData[1].attractions
  card3.querySelector("h4").innerHTML = eventosPorData[2].attractions

  card1.querySelector("p").innerHTML = eventosPorData[0].description
  card2.querySelector("p").innerHTML = eventosPorData[1].description
  card3.querySelector("p").innerHTML = eventosPorData[2].description

  
}

listaEventos()