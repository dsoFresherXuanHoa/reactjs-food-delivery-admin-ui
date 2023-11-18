const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

export const CurrencyFormat = (value) => formatter.format(value);
