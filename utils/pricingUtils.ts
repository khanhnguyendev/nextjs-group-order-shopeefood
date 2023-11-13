export const parsePrice = (priceString: string): number => {
  const numericString = priceString.replace(/[^\d]/g, "");
  return parseInt(numericString, 10);
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
