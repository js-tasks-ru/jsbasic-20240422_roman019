function toggleText() {

  let button = document.querySelector('.toggle-text-button');
  let textField = document.getElementById('text');

  button.addEventListener('click', () => textField.hidden = !textField.hidden);
}
