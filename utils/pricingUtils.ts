export const parsePrice = (priceString: string): number => {
  const numericString = priceString.replace(/[^\d]/g, "");
  return parseInt(numericString, 10);
};

export const formatPrice = (price: number): string => {
  const formattedPrice = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Remove space between currency symbol and price
  return formattedPrice.replace(/\s/g, "");
};
