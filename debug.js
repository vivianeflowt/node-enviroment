function getChange(productValue, payment) {
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const res = [];
  let amount = payment - productValue;
  console.log(amount);

  for (let i = 0; i < coins.length; i++) {
    console.log(coins[i]);
    while (amount >= coins[i]) {
      amount -= coins[i];
      res.push(coins[i]);
    }
  }

  return res;
}

console.log(getChange(10, 60));
