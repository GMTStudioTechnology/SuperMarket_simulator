export interface Product {
  name: string;
  basePrice: number;
  supplierPrice: number;
  maxPrice: number;
  tier: number;
  isPerishable?: boolean;
  expiryDays?: number;
  stock: number;
  sellingPrice: number;
  expiryDates?: Date[];
}

export interface Customer {
  id: string;
  patience: number;
  budgetMultiplier: number;
  shoppingList: string[];
  timeEntered: Date;
}

export interface Employee {
  name: string;
  role: 'Stocking' | 'Checkout';
  salary: number;
  hireDate: Date;
}

export interface GameState {
  cash: number;
  level: number;
  day: number;
  products: Record<string, Product>;
  customers: Customer[];
  employees: Employee[];
  earnings: number[];
  expenses: number[];
  gameStarted: boolean;
  lastSaved: Date;
}