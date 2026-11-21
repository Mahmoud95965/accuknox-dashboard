import { useDispatch, useSelector } from "react-redux";
import { removeWidget, addWidget } from "../store/dashboardSlice";
import type { RootState, AppDispatch } from "../store/store";

interface Props {
  onClose: () => void;
}

export default function ManageWidgetsPanel({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((s: RootState) => s.dashboard.categories);

  // Build the union of all widgets across categories so a widget that
  // exists in any category can be unchecked (removed) from a given one.
  const toggle = (
    categoryId: string,
    widgetId: string,
    currentlyPresent: boolean
  ) => {
    if (currentlyPresent) {
      dispatch(removeWidget({ categoryId, widgetId }));
    } else {
      const source = categories
        .flatMap((c) => c.widgets)
        .find((w) => w.id === widgetId);
      if (source) {
        dispatch(
          addWidget({
            categoryId,
            name: source.name,
            text: source.text,
          })
        );
      }
    }
  };

  return (
    <div className="panel-backdrop" onClick={onClose}>
      <aside
        className="panel"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="panel-header">
          <h2>Add Category / Manage Widgets</h2>
          <button className="widget-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <p className="panel-hint">
          Uncheck a widget to remove it from a category.
        </p>
        <div className="panel-body">
          {categories.map((category) => (
            <section key={category.id} className="panel-category">
              <h3>{category.name}</h3>
              {category.widgets.length === 0 && (
                <p className="panel-empty">No widgets in this category.</p>
              )}
              {category.widgets.map((widget) => (
                <label key={widget.id} className="panel-row">
                  <input
                    type="checkbox"
                    checked
                    onChange={() => toggle(category.id, widget.id, true)}
                  />
                  <span>{widget.name}</span>
                </label>
              ))}
            </section>
          ))}
        </div>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}
