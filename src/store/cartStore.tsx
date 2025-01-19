import { Product } from "@/pages/admin/Products";
import { create } from "zustand";

type CartProduct = Product & {
  quantity: number;
};

type CartState = {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  decreaseQuantity: (productId) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          return {
            cart: state.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          };
        } else {
          return {
            cart: state.cart.filter((item) => item.id !== productId),
          };
        }
      }
      return state;
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
