function makeDiagonalRed(table) {

  for (let i = 0; i < table.rows.length; i++) {
    if (table.rows[i].cells.length < i) continue;
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
