import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  cardHTML = `<div class="card">
                <div class="card__top">
                  <img src="" class="card__image" alt="product">
                  <span class="card__price"></span>
                </div>
                <div class="card__body">
                  <div class="card__title"></div>
                  <button type="button" class="card__button">
                    <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                  </button>
                </div>
              </div>`;

  constructor(product) {

    let cardElement = createElement(this.cardHTML);
    let priceElement = cardElement.querySelector('.card__price');
    let imageElement = cardElement.querySelector('.card__image');
    let titleElement = cardElement.querySelector('.card__title');
    let btnElement = cardElement.querySelector('.card__button');
    let imageCatalog = '/assets/images/products/';

    priceElement.innerHTML = `€${product.price.toFixed(2)}`;
    titleElement.innerHTML = product.name;
    imageElement.setAttribute('src', imageCatalog + product.image);

    btnElement.addEventListener('click', btnClick);

    this.elem = cardElement;

    function btnClick(event) {

      let productAddEvent = new CustomEvent('product-add', {
        detail: product.id,
        bubbles: true,
      });

      cardElement.dispatchEvent(productAddEvent);
    }
  }
}