# CNAPP Dashboard - AccuKnox Frontend Trainee Assignment

A dynamic, JSON-driven dashboard built with **React + TypeScript + Vite**, **Redux Toolkit** for state management and **Recharts** for the charts.

## Features

- Dashboard is built dynamically from a JSON structure (`src/data/dashboardData.json`): categories, each holding multiple widgets.
- **Add a widget**: the "+ Add Widget" card inside any category opens a form asking for the widget name and widget text; the new widget is appended to that category.
- **Remove a widget**: every widget has a close (×) icon. Widgets can also be removed by unchecking them in the "Add Category / Manage Widgets" side panel.
- **Search**: the top bar search filters across the names and texts of all widgets in all categories.
- State is managed locally with Redux Toolkit and persisted to `localStorage`, so changes survive a reload. "Reset" in the top bar restores the bundled JSON.

## Tech stack

- React 18 + TypeScript (Vite)
- Redux Toolkit + react-redux (store management)
- Recharts (donut charts)

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# -> http://localhost:5173
```

## Production build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Project structure

```
src/
  data/dashboardData.json        # the JSON the dashboard is built from
  store/
    store.ts                     # Redux store + localStorage persistence
    dashboardSlice.ts            # add / remove / search reducers
  components/
    WidgetCard.tsx               # one widget (donut / bar / empty / text)
    DonutChart.tsx               # recharts donut + legend
    BarGauge.tsx                 # stacked severity bar
    AddWidgetModal.tsx           # add-widget form (name + text)
    ManageWidgetsPanel.tsx       # uncheck-to-remove panel
  App.tsx                        # layout, search filtering
```
