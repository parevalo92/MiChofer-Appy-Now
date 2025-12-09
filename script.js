const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
//Toggle mobile menu
    document.body.classList.toggle("show-mobile-menu");
});

//Close menu whe the close button is clicked
    menuCloseButton.addEventListener("click", () => menuOpenButton.click());

//Close menu whe the nav link is clicked

    navLinks.forEach(link => {
        link.addEventListener("click", () => menuOpenButton.click());
    });

// Porque me conviene animatio



// Initialize Swiper

const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

//Responsives Breakpoints

  breakpoints: {
    0: {
        slidesPerView: 1
    },
    768: {
        slidesPerView: 2
    },
    1024: {
        slidesPerView: 3
    },
  }
});

// Animación del fondo del banner usando JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // 1. Seleccionamos el banner
  const banner = document.querySelector(".banner-income");

  // Si no existe, salimos para que no dé error
  if (!banner) {
    console.warn("No se encontró ningún elemento con la clase .banner-income");
    return;
  }

  // 2. Configuramos el fondo desde JS (sin tocar tu CSS en el archivo)
  banner.style.backgroundImage = "linear-gradient(90deg, #4a6ef5, #5575a1, #4a6ef5)";
  banner.style.backgroundSize = "400% 400%";   // Muy importante para que el movimiento se note
  banner.style.backgroundRepeat = "repeat";

  // 3. Animación con requestAnimationFrame
  let pos = 0;

  function animateBackground() {
    pos += 0.1; // velocidad (sube para más rápido, baja para más lento)

    // Movemos el fondo horizontalmente
    banner.style.backgroundPosition = pos + "% 50%";

    // Reseteamos para que no crezca infinito
    if (pos > 400) {
      pos = 0;
    }

    requestAnimationFrame(animateBackground);
  }

  // Iniciamos animación
  animateBackground();
});


// According

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los bloques de requisitos
  const sections = document.querySelectorAll(".requirements");

  sections.forEach(section => {
    const title = section.querySelector(".requirements-title");
    const list = section.querySelector("ul");

    // Estado inicial cerrado
    list.classList.remove("open");

    // Evento al hacer clic en el título
    title.addEventListener("click", () => {
      list.classList.toggle("open");
      title.classList.toggle("active");
    });
  });
});

