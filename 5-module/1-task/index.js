function hideSelf() {

  let button = document.querySelector('.hide-self-button');

  function hideBtn() {
    this.hidden = true;
  };

  button.addEventListener('click', hideBtn);
}
