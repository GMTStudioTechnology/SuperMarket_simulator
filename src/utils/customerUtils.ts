import { Customer } from '../types/game';

export const generateCustomer = (availableProducts: string[]): Customer => {
  const shoppingListSize = Math.floor(Math.random() * 3) + 1;
  const shoppingList: string[] = [];
  
  while (shoppingList.length < shoppingListSize) {
    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    if (!shoppingList.includes(randomProduct)) {
      shoppingList.push(randomProduct);
    }
  }

  return {
    id: Math.random().toString(36).substring(7),
    patience: Math.floor(Math.random() * 31) + 70, // 70-100
    budgetMultiplier: 0.8 + Math.random() * 0.4, // 0.8-1.2
    shoppingList,
    timeEntered: new Date(),
  };
};