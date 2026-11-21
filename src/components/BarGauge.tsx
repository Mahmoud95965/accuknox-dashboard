import type { WidgetSegment } from "../store/dashboardSlice";

interface Props {
  total: number;
  segments: WidgetSegment[];
}

export default function BarGauge({ total, segments }: Props) {
  const sum = segments.reduce((acc, s) => acc + s.value, 0) || 1;
  return (
    <div className="bar-wrap">
      <div className="bar-track">
        {segments.map((s) => (
          <div
            key={s.label}
            className="bar-segment"
            style={{
              width: `${(s.value / sum) * 100}%`,
              backgroundColor: s.color,
            }}
            title={`${s.label}: ${s.value}`}
          />
        ))}
      </div>
      <ul className="legend legend-row">
        {segments.map((s) => (
          <li key={s.label}>
            <span className="dot" style={{ backgroundColor: s.color }} />
            {s.label} ({s.value})
          </li>
        ))}
      </ul>
      <div className="bar-total">{total} total</div>
    </div>
  );
}
