import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  carouselHTML = `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      </div>
    </div>
    `;

  slideHTML = `
        <div class="carousel__slide" data-id="">
          <img src="" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price"></span>
            <div class="carousel__title"></div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
    `;

  constructor(slides) {
    this.slides = slides;

    let carouselElement = createElement(this.carouselHTML);
    let carouselInnerElement = carouselElement.querySelector('.carousel__inner');

    let imgCatalog = '/assets/images/carousel';

    for (let slide of slides) {

      let slideElement = createElement(this.slideHTML);
      let imgElement = slideElement.querySelector('.carousel__img');
      let priceElement = slideElement.querySelector('.carousel__price');
      let titleElement = slideElement.querySelector('.carousel__title');
      let btnElement = slideElement.querySelector('.carousel__button');

      slideElement.dataset.id = slide.id;
      imgElement.setAttribute('src', `${imgCatalog}/${slide.image}`);
      priceElement.innerHTML = `€${slide.price.toFixed(2)}`;
      titleElement.innerHTML = slide.name;

      btnElement.addEventListener('click', btnClick);

      carouselInnerElement.append(slideElement);
    };

    initCarousel();

    this.elem = carouselElement;

    function initCarousel() {

      let arrowRight = carouselElement.querySelector('.carousel__arrow_right');
      let arrowLeft = carouselElement.querySelector('.carousel__arrow_left');
      let slideIndex = 0;
      let maxSlideIndex = slides.length - 1;

      adjustCarouselVisibility();

      arrowRight.addEventListener('click', slideUp);
      arrowLeft.addEventListener('click', slideDown);

      function adjustCarouselVisibility() {

        let offset = carouselInnerElement.offsetWidth;

        arrowRight.style.display = slideIndex == maxSlideIndex ? 'none' : '';
        arrowLeft.style.display = slideIndex == 0 ? 'none' : '';

        carouselInnerElement.style.transform = `translateX(-${slideIndex * offset}px)`;
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

    function btnClick(event) {
      let productAddEvent = new CustomEvent('product-add', {
        detail: event.currentTarget.closest('.carousel__slide').dataset.id,
        bubbles: true,
      });
      carouselElement.dispatchEvent(productAddEvent);
    }
  }
}
