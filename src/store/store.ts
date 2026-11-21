import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer, { STORAGE_KEY } from "./dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ categories: state.dashboard.categories })
    );
  } catch {
    // storage full or unavailable; ignore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
