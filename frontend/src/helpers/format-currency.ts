export function formatIndianCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  }).format(amount);
}
