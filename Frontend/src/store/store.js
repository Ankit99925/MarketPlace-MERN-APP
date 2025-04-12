import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import sellerReducer from "./slices/sellerSlice";
import customerReducer from "./slices/customerSlice";
import publicReducer from "./slices/publicSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["seller"],
  blacklist: ["auth"],
};
const rootReducer = combineReducers({
  auth: authReducer,
  seller: sellerReducer,
  public: publicReducer,
  customer: customerReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
