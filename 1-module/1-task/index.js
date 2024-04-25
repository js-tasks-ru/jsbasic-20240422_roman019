function factorial(n) {

  let i = 0;
  let x = 1;

  while (i <= n) {
    if (i > 0) {
      x = x * i;
    }
    i++;
  }
  return x;
}