function highlight(table) {

  let indexStatus = 3;
  let indexGender = 2;
  let indexAge = 1;

  for (let i = 1; i < table.rows.length; i++) {

    if (table.rows[i].cells[indexStatus].hasAttribute('data-available')) {

      if (table.rows[i].cells[indexStatus].dataset.available == 'true') {
        table.rows[i].classList.add('available');
      } else {
        table.rows[i].classList.add('unavailable');
      };

    } else {
      table.rows[i].hidden = true;
    };

    if (table.rows[i].cells[indexGender].textContent == 'm') {
      table.rows[i].classList.add('male');
    } else {
      table.rows[i].classList.add('female');
    };

    if (Number(table.rows[i].cells[indexAge].textContent) < 18) {
      table.rows[i].style.textDecoration = 'line-through';
    };
  };
}
