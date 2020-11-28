function getChange(payable, paid) {
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const change = [];
  const { length } = coins;
  let remaining = paid - payable;

  // escreva seu código aqui...

  return change;
}

console.log(getChange(100, 23));
