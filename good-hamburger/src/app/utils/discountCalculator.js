
export function calculateDiscount(cartItems) {
  const basePrice = cartItems.reduce((total, item) => total + item.price, 0);

  const sandwichCount = cartItems.filter(item => item.category === "sandwich").length;
  const hasSoftDrink = cartItems.some(item => item.id === 5);
  const hasFries = cartItems.some(item => item.id === 4);

  if (sandwichCount === 1) {
    if (hasSoftDrink && hasFries) {
      return { 
        totalPrice: basePrice * 0.8, 
        discountPercentage: 20,
        basePrice 
      };
    }

    if (hasSoftDrink) {
      return { 
        totalPrice: basePrice * 0.85, 
        discountPercentage: 15,
        basePrice 
      };
    }

    if (hasFries) {
      return { 
        totalPrice: basePrice * 0.9, 
        discountPercentage: 10,
        basePrice 
      };
    }
  }

  return { 
    totalPrice: basePrice, 
    discountPercentage: 0,
    basePrice 
  };
}

