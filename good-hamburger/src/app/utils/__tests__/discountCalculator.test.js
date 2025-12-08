import { calculateDiscount } from '../discountCalculator';

describe('calculateDiscount', () => {

  test('should apply 20% discount when cart has 1 sandwich, Soft Drink and Fries', () => {
    const cartItems = [
      { id: 1, name: 'Burger', price: 5.00, category: 'sandwich' },
      { id: 4, name: 'Fries', price: 2.00, category: 'extra' },
      { id: 5, name: 'Soft Drink', price: 2.50, category: 'extra' }
    ];

    const result = calculateDiscount(cartItems);

    const expectedBasePrice = 5.00 + 2.00 + 2.50;
    const expectedTotalPrice = expectedBasePrice * 0.8;

    expect(result.basePrice).toBe(expectedBasePrice);
    expect(result.discountPercentage).toBe(20);
    expect(result.totalPrice).toBe(expectedTotalPrice);
  });

  test('should apply 15% discount when cart has 1 sandwich and Soft Drink', () => {
    const cartItems = [
      { id: 1, name: 'Burger', price: 5.00, category: 'sandwich' },
      { id: 5, name: 'Soft Drink', price: 2.50, category: 'extra' }
    ];

    const result = calculateDiscount(cartItems);

    const expectedBasePrice = 5.00 + 2.50;
    const expectedTotalPrice = expectedBasePrice * 0.85;

    expect(result.basePrice).toBe(expectedBasePrice);
    expect(result.discountPercentage).toBe(15);
    expect(result.totalPrice).toBe(expectedTotalPrice);
  });

  test('should return 0% discount when cart does not match any discount rule', () => {
    const cartItems = [
      { id: 1, name: 'Burger', price: 5.00, category: 'sandwich' }
    ];

    const result = calculateDiscount(cartItems);

    expect(result.basePrice).toBe(5.00);
    expect(result.discountPercentage).toBe(0);
    expect(result.totalPrice).toBe(5.00);
  });

  test('should apply 10% discount when cart has 1 sandwich and Fries', () => {
    const cartItems = [
      { id: 1, name: 'Burger', price: 5.00, category: 'sandwich' },
      { id: 4, name: 'Fries', price: 2.00, category: 'extra' }
    ];

    const result = calculateDiscount(cartItems);

    const expectedBasePrice = 7.00;
    const expectedTotalPrice = expectedBasePrice * 0.9;

    expect(result.basePrice).toBe(expectedBasePrice);
    expect(result.discountPercentage).toBe(10);
    expect(result.totalPrice).toBe(expectedTotalPrice);
  });

  test('should return 0% discount when cart has extras but no sandwich', () => {
    const cartItems = [
      { id: 4, name: 'Fries', price: 2.00, category: 'extra' },
      { id: 5, name: 'Soft Drink', price: 2.50, category: 'extra' }
    ];

    const result = calculateDiscount(cartItems);

    const expectedBasePrice = 4.50;

    expect(result.basePrice).toBe(expectedBasePrice);
    expect(result.discountPercentage).toBe(0);
    expect(result.totalPrice).toBe(expectedBasePrice);
  });

  test('should return 0 for all values when cart is empty', () => {
    const cartItems = [];

    const result = calculateDiscount(cartItems);

    expect(result.basePrice).toBe(0);
    expect(result.discountPercentage).toBe(0);
    expect(result.totalPrice).toBe(0);
  });
});

