const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Відкрити меню" : "Закрити меню");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Відкрити меню");
    mainNav.classList.remove("is-open");
  }
});

const gallery = document.querySelector("#art-grid");
const galleryMore = document.querySelector("#gallery-more");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const lightboxCaption = document.querySelector(".lightbox__caption");
const artCards = [...gallery.querySelectorAll(".art-card")];
let activeCardIndex = 0;

galleryMore.addEventListener("click", () => {
  const isExpanded = gallery.classList.toggle("is-expanded");
  galleryMore.textContent = isExpanded ? "Згорнути галерею ↑" : "Показати всі роботи ↓";
  galleryMore.setAttribute("aria-expanded", String(isExpanded));
});

function showArtwork(index) {
  activeCardIndex = (index + artCards.length) % artCards.length;
  const card = artCards[activeCardIndex];
  lightboxImage.src = card.dataset.full;
  lightboxImage.alt = card.querySelector("img").alt;
  lightboxCaption.textContent = card.dataset.title;
}

gallery.addEventListener("click", (event) => {
  const card = event.target.closest(".art-card");
  if (!card) return;
  showArtwork(artCards.indexOf(card));
  lightbox.showModal();
});

document.querySelector(".lightbox__close").addEventListener("click", () => {
  lightbox.close();
});

document.querySelector(".lightbox__nav--prev").addEventListener("click", () => {
  showArtwork(activeCardIndex - 1);
});

document.querySelector(".lightbox__nav--next").addEventListener("click", () => {
  showArtwork(activeCardIndex + 1);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showArtwork(activeCardIndex + 1);
  if (event.key === "ArrowLeft") showArtwork(activeCardIndex - 1);
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
