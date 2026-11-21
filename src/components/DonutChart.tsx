import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { WidgetSegment } from "../store/dashboardSlice";

interface Props {
  total: number;
  segments: WidgetSegment[];
  centerLabel?: string;
}

export default function DonutChart({ total, segments, centerLabel = "Total" }: Props) {
  return (
    <div className="donut-wrap">
      <div className="donut-chart">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="label"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={1}
              strokeWidth={0}
            >
              {segments.map((s) => (
                <Cell key={s.label} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center">
          <div className="donut-total">{total}</div>
          <div className="donut-label">{centerLabel}</div>
        </div>
      </div>
      <ul className="legend">
        {segments.map((s) => (
          <li key={s.label}>
            <span className="dot" style={{ backgroundColor: s.color }} />
            {s.label} ({s.value})
          </li>
        ))}
      </ul>
    </div>
  );
}
