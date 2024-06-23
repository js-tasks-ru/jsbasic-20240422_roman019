import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {

  sliderHTML = `<!--Корневой элемент слайдера-->
  <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 40%;">
      <span class="slider__value"></span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 60%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>`;

  constructor({ steps, value = 0 }) {

    let sliderElem = createElement(this.sliderHTML);
    let sliderThumbElem = sliderElem.querySelector('.slider__thumb');
    let sliderValueElem = sliderElem.querySelector('.slider__value');
    let sliderProgressElem = sliderElem.querySelector('.slider__progress');
    let sliderStepsElem = sliderElem.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {

      let stepElem = document.createElement('span');

      sliderStepsElem.append(stepElem);
    }

    setSliderProgress(value);

    sliderElem.addEventListener('click', sliderClicker);

    this.elem = sliderElem;

    function sliderClicker(event) {

      let left = event.x - sliderElem.getBoundingClientRect().x;
      let progress = left / sliderElem.offsetWidth;
      let currentValue = Math.round(progress * (steps - 1));

      setSliderProgress(currentValue);

      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: currentValue,
        bubbles: true
      });

      sliderElem.dispatchEvent(sliderChangeEvent);
    }

    function setSliderProgress(currentValue) {

      let currentProgress = currentValue * 100 / (steps - 1);

      sliderValueElem.innerHTML = currentValue + 1;
      sliderProgressElem.style.width = `${currentProgress}%`;
      sliderThumbElem.style.left = `${currentProgress}%`;

      let oldActiveStep = sliderStepsElem.querySelector('.slider__step-active');

      if (oldActiveStep != null) {
        oldActiveStep.classList.remove('slider__step-active')
      };

      sliderStepsElem.children[currentValue].classList.add('slider__step-active');

    }

  }
}
