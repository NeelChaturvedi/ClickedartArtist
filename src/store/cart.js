import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      deriveMode: item => (item.paperInfo ? 'print' : 'digital'),

      addItemToCart: (item, options = {}) => {
        const newItem = {...item, ...options};
        const newItemMode = get().deriveMode(newItem);

        const itemExists = get().cartItems.find(
          cartItem =>
            cartItem.imageInfo?.image === newItem.imageInfo?.image &&
            get().deriveMode(cartItem) === newItemMode,
        );

        if (itemExists) {
          const updatedCartItems = get().cartItems.map(cartItem =>
            cartItem.imageInfo?.image === newItem.imageInfo?.image &&
            get().deriveMode(cartItem) === newItemMode
              ? {...cartItem, ...newItem}
              : cartItem,
          );
          set({cartItems: updatedCartItems});
        } else {
          set({cartItems: [...get().cartItems, newItem]});
        }
      },

      removeItemFromCart: (productId, mode) => {
        const updatedCartItems = get().cartItems.filter(
          cartItem =>
            !(
              cartItem.imageInfo?.image === productId &&
              get().deriveMode(cartItem) === mode
            ),
        );
        set({cartItems: updatedCartItems});
      },

      isItemInCart: (productId, mode) => {
        const cartItems = get().cartItems;
        const exists = cartItems.some(cartItem => {
          const derivedMode = get().deriveMode(cartItem);
          return (
            cartItem.imageInfo?.image === productId && derivedMode === mode
          );
        });
        return exists;
      },

      calculateTotals: () => {
        const cartItems = get().cartItems;

        const subTotal = cartItems.reduce(
          (sum, item) => sum + (item.subTotal || item.price || 0),
          0,
        );

        const totalAmount = subTotal;
        const finalAmount = totalAmount;

        return {subTotal, totalAmount, finalAmount};
      },

      clearCart: () => {
        set({cartItems: []});
      },
    }),
    {
      name: 'cart-items',
      storage: {
        getItem: async name => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async name => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

export default useCartStore;
