import { configureStore, createSlice, combineReducers, createSelector } from "@reduxjs/toolkit";

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// Cart Slice with Enhanced Features
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { id, price, quantity } = action.payload;
      
      // Check if product already exists in cart
      const existingProduct = state.products.find(product => product.id === id);
      
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push(action.payload);
      }
      
      state.quantity += quantity;
      state.total += price * quantity;
    },
    resetCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
  // Handle auth logout to reset cart
  extraReducers: (builder) => {
    builder.addCase(authSlice.actions.logout, (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    });
  }
});

// Memoized Selectors
const selectCart = (state) => state.cart;
const selectCommissionRate = 0.05; // 5% commission

export const selectTotalWithCommission = createSelector(
  [selectCart],
  (cart) => cart.total + (cart.total * selectCommissionRate)
);

export const selectCartDetails = createSelector(
  [selectCart, selectTotalWithCommission],
  (cart, totalWithCommission) => ({
    ...cart,
    totalWithCommission,
    commission: cart.total * selectCommissionRate
  })
);

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
});

// Configure Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export Actions
export const { login, logout } = authSlice.actions;
export const { addProduct, resetCart } = cartSlice.actions;
