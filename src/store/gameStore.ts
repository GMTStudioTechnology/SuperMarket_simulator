import { create } from 'zustand';
import { GameState, Employee } from '../types/game';
import { generateCustomer } from '../utils/customerUtils';
import { INITIAL_PRODUCTS } from '../constants/products';

interface GameStore extends GameState {
  initGame: () => void;
  buyStock: (productName: string, quantity: number) => void;
  setPrice: (productName: string, price: number) => void;
  serveCustomer: () => void;
  hireEmployee: (employee: Employee) => void;
  updateGame: () => void;
  saveGame: () => void;
  loadGame: () => void;
  isSettingsOpen: boolean;
  soundEnabled: boolean;
  showTutorial: boolean;
}

const INITIAL_STATE: GameState & Pick<GameStore, 'isSettingsOpen' | 'soundEnabled' | 'showTutorial'> = {
  cash: 2000,
  level: 1,
  day: 1,
  products: INITIAL_PRODUCTS,
  customers: [],
  employees: [],
  earnings: [],
  expenses: [],
  gameStarted: false,
  lastSaved: new Date(),
  isSettingsOpen: false,
  soundEnabled: true,
  showTutorial: true,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...INITIAL_STATE,

  initGame: () => {
    set({ gameStarted: true });
    setInterval(() => get().updateGame(), 1000);
  },

  buyStock: (productName: string, quantity: number) => {
    const state = get();
    const product = state.products[productName];
    const cost = product.supplierPrice * quantity;

    if (state.cash >= cost) {
      set((state) => ({
        cash: state.cash - cost,
        products: {
          ...state.products,
          [productName]: {
            ...product,
            stock: product.stock + quantity,
            expiryDates: [
              ...(product.expiryDates || []),
              ...(product.isPerishable
                ? Array(quantity).fill(
                    new Date(Date.now() + product.expiryDays! * 24 * 60 * 60 * 1000)
                  )
                : []),
            ],
          },
        },
        expenses: [...state.expenses, cost],
      }));
    }
  },

  setPrice: (productName: string, price: number) => {
    set((state) => ({
      products: {
        ...state.products,
        [productName]: {
          ...state.products[productName],
          sellingPrice: price,
        },
      },
    }));
  },

  serveCustomer: () => {
    const state = get();
    if (state.customers.length === 0) return;

    const customer = state.customers[0];
    let totalSale = 0;
    let canFulfill = true;

    customer.shoppingList.forEach((productName) => {
      const product = state.products[productName];
      if (product.stock <= 0) canFulfill = false;
      if (product.sellingPrice > product.maxPrice * customer.budgetMultiplier) canFulfill = false;
      totalSale += product.sellingPrice;
    });

    if (canFulfill) {
      customer.shoppingList.forEach((productName) => {
        const product = state.products[productName];
        set((state) => ({
          products: {
            ...state.products,
            [productName]: {
              ...product,
              stock: product.stock - 1,
              expiryDates: product.expiryDates?.slice(1),
            },
          },
        }));
      });

      set((state) => ({
        cash: state.cash + totalSale,
        customers: state.customers.slice(1),
        earnings: [...state.earnings, totalSale],
      }));
    }
  },

  hireEmployee: (employee: Employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
      cash: state.cash - employee.salary * 30,
    }));
  },

  updateGame: () => {
    const state = get();
    
    // Add new customer every 5 seconds
    if (Date.now() % 5000 < 1000) {
      set((state) => ({
        customers: [...state.customers, generateCustomer(Object.keys(state.products))],
      }));
    }

    // Update day counter (10 minutes = 1 day)
    const newDay = Math.floor((Date.now() - state.lastSaved.getTime()) / (10 * 60 * 1000)) + 1;
    if (newDay !== state.day) {
      set({ day: newDay });
    }

    // Auto-save every minute
    if (Date.now() - state.lastSaved.getTime() > 60000) {
      get().saveGame();
    }
  },

  saveGame: () => {
    const state = get();
    localStorage.setItem('supermarket-game', JSON.stringify({
      ...state,
      lastSaved: new Date(),
    }));
    set({ lastSaved: new Date() });
  },

  loadGame: () => {
    const savedGame = localStorage.getItem('supermarket-game');
    if (savedGame) {
      const parsedGame = JSON.parse(savedGame);
      set({
        ...parsedGame,
        lastSaved: new Date(parsedGame.lastSaved),
      });
    }
  },
}));