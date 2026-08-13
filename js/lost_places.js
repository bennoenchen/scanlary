document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.getElementById("lostPlacesSlideshow");
  const img = slideshow.querySelector(".slide-img");
  const prevBtn = slideshow.querySelector(".prev");
  const nextBtn = slideshow.querySelector(".next");
  const caption = slideshow.querySelector(".slideshow-caption"); // relativ statt global

  const path = slideshow.dataset.path;
  const start = parseInt(slideshow.dataset.start, 10);
  const end = parseInt(slideshow.dataset.end, 10);
  const intervalMs = parseInt(slideshow.dataset.interval, 10) || 5000;

  let current = start;
  let timer = null;

  function fileName(num) {
    return String(num).padStart(3, "0") + ".jpg";
  }

  function preload(num) {
    const nextImg = new Image();
    nextImg.src = path + fileName(num);
  }

  function showImage(num) {
    img.src = path + fileName(num);
    img.alt = `Lost-Place-Foto ${String(num).padStart(3, "0")}`;
    img.onerror = () => {
      console.warn(`Bild ${fileName(num)} konnte nicht geladen werden.`);
    };
    if (caption) {
      caption.textContent = `Bild ${String(num).padStart(3, "0")} von ${String(end).padStart(3, "0")}`;
    }
    // nächstes Bild schon mal vorladen
    const upcoming = num + 1 > end ? start : num + 1;
    preload(upcoming);
  }

  function nextImage() {
    current = current + 1 > end ? start : current + 1;
    showImage(current);
  }

  function prevImage() {
    current = current - 1 < start ? end : current - 1;
    showImage(current);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextImage, intervalMs);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  function resetAutoplay() {
    startAutoplay(); // Timer nach manueller Aktion neu starten
  }

  prevBtn.addEventListener("click", () => {
    prevImage();
    resetAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    nextImage();
    resetAutoplay();
  });

  // Pause bei Hover
  slideshow.addEventListener("mouseenter", stopAutoplay);
  slideshow.addEventListener("mouseleave", startAutoplay);

  // Tastatur-Navigation
  slideshow.setAttribute("tabindex", "0");
  slideshow.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prevImage(); resetAutoplay(); }
    if (e.key === "ArrowRight") { nextImage(); resetAutoplay(); }
  });

  showImage(current);
  startAutoplay();
});