
export function calculateDiscount(cartItems) {
  const basePrice = cartItems.reduce((total, item) => total + item.price, 0);

  const sandwichCount = cartItems.filter(item => item.category === "sandwich").length;
  const extraCount = cartItems.filter(item => item.category === "extra").length;

  if (sandwichCount === 1 && extraCount === 2) {
    return { 
      totalPrice: basePrice * 0.8, 
      discountPercentage: 20,
      basePrice 
    };
  }

  if (sandwichCount === 1 && extraCount === 1) {
    return { 
      totalPrice: basePrice * 0.85, 
      discountPercentage: 15,
      basePrice 
    };
  }

  if (extraCount === 2) {
    return { 
      totalPrice: basePrice * 0.9, 
      discountPercentage: 10,
      basePrice 
    };
  }

  return { 
    totalPrice: basePrice, 
    discountPercentage: 0,
    basePrice 
  };
}

