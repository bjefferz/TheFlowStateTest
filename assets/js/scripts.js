//Animation for Testimonials on About page
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimony");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    let index = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove("active")); 
        slides[n].classList.add("active");
    }

    function nextSlide() {
        index = (index + 1) % slides.length;
        showSlide(index);
    }
    function prevSlideFunc() {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlideFunc);

    setInterval(nextSlide, 8000);
    showSlide(index);
});