//Animation for Testimonials on About page
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".testimony");
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    let index = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove("active-a")); 
        slides[n].classList.add("active-a");
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


// ----- Home Page Slides -----
let mainSlideIndex = 1;

document.addEventListener("DOMContentLoaded", function () {
    showSlides(mainSlideIndex);
});

function plusSlide(n) {
    showSlides(mainSlideIndex += n);
}

function currentSlide(n) {
    showSlides(mainSlideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide-home");
    let dots = document.getElementsByClassName("dot");
  
    if (n > slides.length) {mainSlideIndex = 1}
    if (n < 1) {mainSlideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
  
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-home", "");
    }

    slides[mainSlideIndex-1].style.display = "block";
    
    dots[mainSlideIndex-1].className += " active-home";
}