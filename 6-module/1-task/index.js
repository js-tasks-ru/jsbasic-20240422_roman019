/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {

    let table = document.createElement('table');
    let tableHead = document.createElement('thead');

    let headContent = {
      name: 'Имя',
      age: 'Возраст',
      salary: 'Зарплата',
      city: 'Город',
    };

    let tHeadRow = createRow(headContent);

    tableHead.append(tHeadRow);
    table.append(tableHead);

    let tableBody = document.createElement('tbody');

    for (let rowContent of rows) {
      let row = createRow(rowContent, true);
      tableBody.append(row);
    };

    table.append(tableBody);
    this.elem = table;

    function createRow(content, createButton = false) {

      let row = document.createElement('tr');

      row.addEventListener('click', deleteRow);

      for (let key in content) {
        let cell = document.createElement('td');
        cell.innerText = content[key];
        row.append(cell);
      };

      let buttonCell = document.createElement('td');

      if (createButton) {
        let button = document.createElement('button');
        button.innerText = 'X';
        buttonCell.append(button);
      };

      row.append(buttonCell);

      return row;
    }

    function deleteRow(event) {
      if (event.target.tagName == "BUTTON") event.currentTarget.remove();
    }
  }
}
