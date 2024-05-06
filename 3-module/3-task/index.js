function camelize(str) {

  let array = str.split('-');

  array = array.map((item, i) => {
    let newItem;
    if (i > 0 && item.length > 0) {
      newItem = item[0].toUpperCase() + item.slice(1);
    } else {
      newItem = item;
    };
    return newItem;
  });

  array = array.filter(item => item.length > 0);

  return array.join('');
}