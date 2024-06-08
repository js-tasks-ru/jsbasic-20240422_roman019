import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  ribbonHTML = `<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <nav class="ribbon__inner">
      </nav>

      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`;

  ribbonItemHTML = `<a href="#" class="ribbon__item" data-id=""></a>`;

  constructor(categories) {
    this.categories = categories;

    let ribbonElement = createElement(this.ribbonHTML);
    let ribbonInnerElement = ribbonElement.querySelector('.ribbon__inner');
    let ribbonArrowLeft = ribbonElement.querySelector('.ribbon__arrow_left');
    let ribbonArrowRight = ribbonElement.querySelector('.ribbon__arrow_right');
    let itemLength = 350;

    for (let categorie of categories) {
      let ribbonItemElement = createElement(this.ribbonItemHTML);

      ribbonItemElement.dataset.id = categorie.id;
      ribbonItemElement.innerHTML = categorie.name;
      ribbonItemElement.addEventListener('click', itemActivator);

      ribbonInnerElement.append(ribbonItemElement);
    };

    ribbonArrowLeft.addEventListener('click', shiftLeft);
    ribbonArrowRight.addEventListener('click', shiftRight);
    ribbonInnerElement.addEventListener('scroll', adjustArrows);

    ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
    ribbonArrowRight.classList.add('ribbon__arrow_visible');

    this.elem = ribbonElement;

    function shiftLeft(event) {
      ribbonInnerElement.scrollBy(-itemLength, 0);
    }

    function shiftRight(event) {
      ribbonInnerElement.scrollBy(itemLength, 0);
    }

    function adjustArrows(event) {

      let scrollRight = ribbonInnerElement.scrollWidth - ribbonInnerElement.clientWidth - ribbonInnerElement.scrollLeft;

      if (ribbonInnerElement.scrollLeft < 1) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      };

      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
      };
    }

    function itemActivator(event) {

      event.preventDefault();

      let removeItemActive = ribbonInnerElement.querySelector('.ribbon__item_active');

      if (removeItemActive != null) {
        removeItemActive.classList.remove('ribbon__item_active');
      };

      event.target.classList.add('ribbon__item_active');

      let ribbonSelectEvent = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true,
      });

      ribbonElement.dispatchEvent(ribbonSelectEvent);
    }
  }
}
