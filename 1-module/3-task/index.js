function ucFirst(str) {

  let newStr = '';

  for (let i = 0; i < str.length; i++) {

    newStr = newStr + ((i == 0) ? str[i].toUpperCase() : str[i]);
  }

  return newStr;
}
