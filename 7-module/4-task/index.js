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

    sliderThumbElem.ondragstart = () => false;

    sliderThumbElem.addEventListener('pointerdown', thumbDown);

    this.elem = sliderElem;

    function sliderClicker(event) {

      let progress = getProgress(event);
      let currentValue = Math.round(progress * (steps - 1) / 100);
      let currentProgress = currentValue * 100 / (steps - 1);

      setSliderProgress(currentValue, currentProgress);

      dispatchSliderChangeEvent();
    }

    function setSliderProgress(currentValue, currentProgress) {

      if (currentProgress == undefined) {
        currentProgress = currentValue * 100 / (steps - 1);
      }

      sliderValueElem.innerHTML = currentValue + 1;
      sliderProgressElem.style.width = `${currentProgress}%`;
      sliderThumbElem.style.left = `${currentProgress}%`;

      let oldActiveStep = sliderStepsElem.querySelector('.slider__step-active');

      if (oldActiveStep != null) {
        oldActiveStep.classList.remove('slider__step-active');
      };

      sliderStepsElem.children[currentValue].classList.add('slider__step-active');

    }

    function thumbDown(event) {

      document.addEventListener('pointermove', thumbMove);

      document.addEventListener('pointerup', thumbUp);

      sliderElem.classList.add('slider_dragging');

    }

    function thumbMove(event) {

      let progress = getProgress(event);

      if (progress < 0) {
        progress = 0;
      } else if (progress > 100) {
        progress = 100;
      };

      let currentValue = Math.round(progress * (steps - 1) / 100);

      setSliderProgress(currentValue, progress);

    }

    function thumbUp(event) {

      setSliderProgress(sliderValueElem.innerHTML - 1);

      document.removeEventListener('pointermove', thumbMove);

      document.removeEventListener('pointerup', thumbUp);

      sliderElem.classList.remove('slider_dragging');

      dispatchSliderChangeEvent();

    }

    function getProgress(event) {

      let left = event.x - sliderElem.getBoundingClientRect().x;
      let progress = left * 100 / sliderElem.offsetWidth;

      return progress;
    }

    function dispatchSliderChangeEvent() {

      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: sliderValueElem.innerHTML - 1,
        bubbles: true
      });

      sliderElem.dispatchEvent(sliderChangeEvent);
    }

  }
}
