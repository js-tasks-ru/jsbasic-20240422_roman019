function isEmpty(obj) {

  let propExists = false;

  for (let key in obj) {
    propExists = true;
    break;
  }
  return !propExists;
}
