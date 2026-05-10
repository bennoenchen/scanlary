document.addEventListener("DOMContentLoaded", () => {
  const slideshow = document.getElementById("lostPlacesSlideshow");
  const img = slideshow.querySelector(".slide-img");
  const prevBtn = slideshow.querySelector(".prev");
  const nextBtn = slideshow.querySelector(".next");
  const caption = document.getElementById("slideshowCaption");

  const path = slideshow.dataset.path;
  const start = parseInt(slideshow.dataset.start, 10);
  const end = parseInt(slideshow.dataset.end, 10);

  let current = start;

  function fileName(num) {
    return String(num).padStart(3, "0") + ".jpg";
  }

  function showImage(num) {
    img.src = path + fileName(num);
    img.alt = `Lost-Place-Foto ${String(num).padStart(3, "0")}`;
    if (caption) {
      caption.textContent = `Bild ${String(num).padStart(3, "0")} von ${String(end).padStart(3, "0")}`;
    }
  }

  function nextImage() {
    current++;
    if (current > end) current = start;
    showImage(current);
  }

  function prevImage() {
    current--;
    if (current < start) current = end;
    showImage(current);
  }

  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);

  showImage(current);

  setInterval(nextImage, 5000);
});