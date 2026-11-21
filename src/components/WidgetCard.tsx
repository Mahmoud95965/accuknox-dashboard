import { useDispatch } from "react-redux";
import { removeWidget, type Widget } from "../store/dashboardSlice";
import type { AppDispatch } from "../store/store";
import DonutChart from "./DonutChart";
import BarGauge from "./BarGauge";

interface Props {
  categoryId: string;
  widget: Widget;
}

export default function WidgetCard({ categoryId, widget }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="widget-card">
      <button
        className="widget-close"
        aria-label={`Remove ${widget.name}`}
        title="Remove widget"
        onClick={() =>
          dispatch(removeWidget({ categoryId, widgetId: widget.id }))
        }
      >
        ×
      </button>
      <h3 className="widget-title">{widget.name}</h3>
      {widget.type === "donut" && widget.data && (
        <DonutChart total={widget.data.total} segments={widget.data.segments} />
      )}
      {widget.type === "bar" && widget.data && (
        <>
          <p className="widget-sub">{widget.text}</p>
          <BarGauge total={widget.data.total} segments={widget.data.segments} />
        </>
      )}
      {widget.type === "empty" && (
        <div className="widget-empty">
          <div className="widget-empty-icon">📊</div>
          <p>{widget.text}</p>
        </div>
      )}
      {widget.type === "text" && <p className="widget-text">{widget.text}</p>}
    </div>
  );
}
