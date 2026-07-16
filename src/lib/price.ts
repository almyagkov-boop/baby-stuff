export function getDisplayPrice(
  estimatedPrice: number,
  finalPrice: number
) {
  const value = finalPrice || estimatedPrice;

  return new Intl.NumberFormat("ru-RU").format(value) + " ₽";
}

export function isEstimatedPrice(
  estimatedPrice: number,
  finalPrice: number
) {
  return finalPrice === 0 && estimatedPrice > 0;
}