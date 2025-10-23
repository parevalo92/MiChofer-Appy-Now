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

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".grid-item");

  // Aplica animación con un pequeño retardo en cadena
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("animate");
    }, index * 300);
  });

  
});
