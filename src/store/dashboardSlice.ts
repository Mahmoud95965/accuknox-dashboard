import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import initialData from "../data/dashboardData.json";

export interface WidgetSegment {
  label: string;
  value: number;
  color: string;
}

export interface Widget {
  id: string;
  name: string;
  type: "donut" | "bar" | "empty" | "text";
  text: string;
  data?: {
    total: number;
    segments: WidgetSegment[];
  };
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardState {
  categories: Category[];
  searchQuery: string;
}

const STORAGE_KEY = "cnapp-dashboard-state-v1";

function loadInitialState(): DashboardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.categories)) {
        return { categories: parsed.categories, searchQuery: "" };
      }
    }
  } catch {
    // fall through to bundled JSON
  }
  return { categories: initialData.categories as Category[], searchQuery: "" };
}

const initialState: DashboardState = loadInitialState();

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    addWidget: (
      state,
      action: PayloadAction<{ categoryId: string; name: string; text: string }>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (!category) return;
      category.widgets.push({
        id: nanoid(),
        name: action.payload.name,
        text: action.payload.text,
        type: "text",
      });
    },
    removeWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const category = state.categories.find(
        (c) => c.id === action.payload.categoryId
      );
      if (!category) return;
      category.widgets = category.widgets.filter(
        (w) => w.id !== action.payload.widgetId
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetDashboard: () => {
      localStorage.removeItem(STORAGE_KEY);
      return {
        categories: initialData.categories as Category[],
        searchQuery: "",
      };
    },
  },
});

export const { addWidget, removeWidget, setSearchQuery, resetDashboard } =
  dashboardSlice.actions;
export { STORAGE_KEY };
export default dashboardSlice.reducer;
