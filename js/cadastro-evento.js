const form = document.querySelector("form");

form.onsubmit = async (e) => {
  e.preventDefault();

  try {
    const novoEvento = {};
    
    formParaObj(form, novoEvento);

    await criarEvento(novoEvento);
    window.location.replace("admin.html")
  } catch (error) {
    console.log(error);
  }
};