"use client";

import { useAgent } from "./AgentContext";

const colorByType = {
  flight: "#1d4ed8",
  hotel: "#047857",
  persona: "#f97316",
  note: "#7c3aed"
};

export default function MemoryPanel() {
  const { memoryLog } = useAgent();

  return (
    <div className="card memory">
      <h2>Agent Memory Log</h2>
      <p className="muted">Every decision the agent makes is informed by this rich context.</p>
      <ul className="timeline">
        {memoryLog.length === 0 && <li className="muted">No memories yet. Add flights and hotels to get started.</li>}
        {memoryLog.map((memory) => (
          <li key={memory.timestamp + memory.detail.slice(0, 6)}>
            <span
              className="pill"
              style={{ backgroundColor: colorByType[memory.type] ?? "#4b5563" }}
            >
              {memory.type.toUpperCase()}
            </span>
            <div>
              <strong>{memory.title}</strong>
              <p>{memory.detail}</p>
              <time>{new Date(memory.timestamp).toLocaleString()}</time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
