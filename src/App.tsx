import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  resetDashboard,
  type Category,
} from "./store/dashboardSlice";
import type { RootState, AppDispatch } from "./store/store";
import WidgetCard from "./components/WidgetCard";
import AddWidgetModal from "./components/AddWidgetModal";
import ManageWidgetsPanel from "./components/ManageWidgetsPanel";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((s: RootState) => s.dashboard.categories);
  const searchQuery = useSelector((s: RootState) => s.dashboard.searchQuery);

  const [modalCategory, setModalCategory] = useState<Category | null>(null);
  const [manageOpen, setManageOpen] = useState(false);

  const query = searchQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return categories;
    return categories
      .map((c) => ({
        ...c,
        widgets: c.widgets.filter(
          (w) =>
            w.name.toLowerCase().includes(query) ||
            w.text.toLowerCase().includes(query)
        ),
      }))
      .filter((c) => c.widgets.length > 0);
  }, [categories, query]);

  const totalMatches = filtered.reduce((acc, c) => acc + c.widgets.length, 0);

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="breadcrumbs">
            Home <span className="crumb-sep">›</span>{" "}
            <strong>Dashboard V2</strong>
          </div>
          <input
            className="search"
            type="search"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <div className="topbar-actions">
            <button className="btn btn-ghost" onClick={() => dispatch(resetDashboard())}>
              Reset
            </button>
            <button className="btn btn-outline" onClick={() => setManageOpen(true)}>
              Add Category +
            </button>
          </div>
        </div>
      </header>

      <main className="content">
        <h1 className="page-title">CNAPP Dashboard</h1>

        {query && (
          <p className="search-note">
            {totalMatches} widget{totalMatches === 1 ? "" : "s"} matching "
            {searchQuery}"
          </p>
        )}

        {filtered.map((category) => (
          <section key={category.id} className="category">
            <h2 className="category-title">{category.name}</h2>
            <div className="widget-grid">
              {category.widgets.map((widget) => (
                <WidgetCard
                  key={widget.id}
                  categoryId={category.id}
                  widget={widget}
                />
              ))}
              {!query && (
                <button
                  className="add-widget-card"
                  onClick={() => setModalCategory(category)}
                >
                  <span className="add-widget-plus">+</span> Add Widget
                </button>
              )}
            </div>
          </section>
        ))}

        {filtered.length === 0 && query && (
          <p className="search-note">No widgets match your search.</p>
        )}
      </main>

      {modalCategory && (
        <AddWidgetModal
          categoryId={modalCategory.id}
          categoryName={modalCategory.name}
          onClose={() => setModalCategory(null)}
        />
      )}
      {manageOpen && <ManageWidgetsPanel onClose={() => setManageOpen(false)} />}
    </div>
  );
}

export default App;
