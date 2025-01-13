export const priceFormatter = (price: string) => {
  const reversePrice = price.split("").reverse();
  let newPrice = "";
  for (let i = 0; i < price.length; i++) {
    newPrice = newPrice + reversePrice[i];
    if ((i + 1) % 3 === 0 && i !== price.length - 1) {
      newPrice = newPrice + ",";
    }
  }
  return newPrice.split("").reverse().join("");
};
