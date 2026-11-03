// animacao de scroll suave
function smoothScrollTo(targetY, duration = 650) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // desaceleracao suave
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startY + difference * ease);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function initNavigation() {
  const header = document.getElementById("topHeader");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  // menu mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // navegacao suave entre as secoes
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();

        // fecha menu mobile ao clicar
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }

        // compensa a altura do header
        const headerOffset = header ? header.offsetHeight : 74;
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        smoothScrollTo(targetPosition, 600);

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // marca o link ativo no scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    const headerOffset = header ? header.offsetHeight + 40 : 110;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerOffset;
      const sectionId = current.getAttribute("id");
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          activeLink.classList.add("active");
        } else {
          activeLink.classList.remove("active");
        }
      }
    });
  }, { passive: true });

  // envio do formulario
  const form = document.getElementById("formContato");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", function(e) {
      const nome = document.getElementById("campo-nome").value.trim();
      const email = document.getElementById("campo-email").value.trim();
      const msg = document.getElementById("campo-msg").value.trim();

      if (!nome || !email || !msg) {
        e.preventDefault();
        alert("Preencha todos os campos antes de enviar!");
        return;
      }

      if (feedback) {
        feedback.style.display = "block";
        feedback.textContent = "Mensagem enviada com sucesso! Entrarei em contato em breve.";
      }
    });
  }
}

// inicia quando a pagina carregar
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}
