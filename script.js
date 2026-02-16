"use strict";

const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

// Toggle mobile menu
if (menuOpenButton) {
  menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
  });
}

// Close menu
if (menuCloseButton && menuOpenButton) {
  menuCloseButton.addEventListener("click", () => menuOpenButton.click());
}

// Close menu when nav link clicked
if (menuOpenButton) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => menuOpenButton.click());
  });
}

// Initialize Swiper (solo si existe y está cargado)
if (window.Swiper && document.querySelector(".slider-wrapper")) {
  new Swiper(".slider-wrapper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Banner animation
  const banner = document.querySelector(".banner-income");
  if (banner) {
    banner.style.backgroundImage =
      "linear-gradient(90deg, #4a6ef5, #5575a1, #4a6ef5)";
    banner.style.backgroundSize = "400% 400%";
    banner.style.backgroundRepeat = "repeat";

    let pos = 0;
    function animateBackground() {
      pos += 0.1;
      banner.style.backgroundPosition = pos + "% 50%";
      if (pos > 400) pos = 0;
      requestAnimationFrame(animateBackground);
    }
    animateBackground();
  }

  // Accordion requirements
  const sections = document.querySelectorAll(".requirements");
  sections.forEach((section) => {
    const title = section.querySelector(".requirements-title");
    const list = section.querySelector("ul");
    if (!title || !list) return;

    list.classList.remove("open");
    title.addEventListener("click", () => {
      list.classList.toggle("open");
      title.classList.toggle("active");
    });
  });

  // Video hero
  const playBtn = document.getElementById("playVideo");
  const video = document.getElementById("heroVideo");
  const thumb = document.querySelector(".video-thumb");

  if (playBtn && video) {
    playBtn.addEventListener("click", () => {
      if (thumb) thumb.style.display = "none";
      playBtn.style.display = "none";
      video.style.display = "block";
      video.setAttribute("controls", "controls");
      video.play().catch(() => {});
    });
  }
});
