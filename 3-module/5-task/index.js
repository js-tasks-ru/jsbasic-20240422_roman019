function getMinMax(str) {

  let array = str.split(' ');

  array = array.filter(item => isFinite(item));

  array.sort((a, b) => a - b);

  let result = {
    min: Number(array[0]),
    max: Number(array.at(-1)),
  };
  return result;
}