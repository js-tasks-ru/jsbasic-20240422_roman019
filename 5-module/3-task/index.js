function initCarousel() {

  let carousel = document.querySelector('.carousel__inner');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let offset = carousel.offsetWidth;
  let slideIndex = 0;
  let maxSlideIndex = 3;

  adjustCarouselVisibility();

  arrowRight.addEventListener('click', slideUp);
  arrowLeft.addEventListener('click', slideDown);

  function adjustCarouselVisibility() {
    arrowRight.style.display = slideIndex == maxSlideIndex ? 'none' : '';
    arrowLeft.style.display = slideIndex == 0 ? 'none' : '';
    carousel.style.transform = `translateX(-${slideIndex * offset}px)`;
  }

  function slideUp() {
    if (slideIndex == maxSlideIndex) return;
    slideIndex++;
    adjustCarouselVisibility();
  }

  function slideDown() {
    if (slideIndex == 0) return;
    slideIndex--;
    adjustCarouselVisibility();
  }
}
