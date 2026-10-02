export function formatCurrency(
  amount: number | string,
  currency: string,
): string {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "-";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}
