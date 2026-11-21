import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/dashboardSlice";
import type { AppDispatch } from "../store/store";

interface Props {
  categoryId: string;
  categoryName: string;
  onClose: () => void;
}

export default function AddWidgetModal({ categoryId, categoryName, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const canSubmit = name.trim().length > 0 && text.trim().length > 0;

  const submit = () => {
    if (!canSubmit) return;
    dispatch(
      addWidget({
        categoryId,
        name: name.trim(),
        text: text.trim(),
      })
    );
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add Widget to {categoryName}</h2>
          <button className="widget-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <label className="field">
          <span>Widget name</span>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Compliance Trend"
          />
        </label>
        <label className="field">
          <span>Widget text</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Random text for assignment purposes"
            rows={4}
          />
        </label>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={!canSubmit} onClick={submit}>
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
}
