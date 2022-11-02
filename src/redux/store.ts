import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { NotesReducer } from "./notesSlice";
import { AuthReducer } from "./auth/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { notesApi } from "./notesApi";
import { categoriesApi } from "./categoriesApi";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, AuthReducer),
  notes: NotesReducer,
});

export const store = configureStore({
  reducer: {
    root: rootReducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }).concat(notesApi.middleware, categoriesApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
