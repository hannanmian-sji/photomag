const filterButtons = document.querySelectorAll(".filter-chip");
const photoCards = document.querySelectorAll(".photo-card");
const emptyState = document.querySelector(".empty-state");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    photoCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  });
  button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxCredit = document.querySelector(".lightbox-credit");

photoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const photo = card.querySelector(".photo-image");
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightboxTitle.textContent = card.dataset.title;
    lightboxCredit.textContent = `Image via ${card.dataset.credit}`;
    lightbox.showModal();
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
