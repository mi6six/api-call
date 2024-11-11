// Select all slide radio buttons
const slides = document.querySelectorAll("input[type='radio'][name='slider']");
let currentIndex = 0;

// Function to move to a specific slide
function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    slides[index].checked = true;
    currentIndex = index;
  }
}

// Arrow key navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    goToSlide((currentIndex + 1) % slides.length); // Next slide
  } else if (e.key === "ArrowLeft") {
    goToSlide((currentIndex - 1 + slides.length) % slides.length); // Previous slide
  }
});
