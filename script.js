function toggleMenu() {
  document.querySelector("nav ul").classList.toggle("active");
}

// FECHAR MENU AO CLICAR NOS LINKS
const links = document.querySelectorAll("nav ul li a");

links.forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("nav ul").classList.remove("active");
  });
});

// mover a tela suavemente
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const section = document.querySelector(this.getAttribute("href"));

    section.scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* formulário contato */
const form = document.getElementById("formContato");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const mensagem = document.getElementById("mensagem").value;

  if (nome === "" || email === "" || mensagem === "") {
    alert("Preencha todos os campos!");
    return;
  }

  function mensagemEnviada() {
  alert("Mensagem enviada com sucesso 🚀");
}
  form.reset();
});