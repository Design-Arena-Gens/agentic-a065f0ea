"use client";

import { useMemo, useState } from "react";
import { useAgent } from "../components/AgentContext";
import FlightForm from "../components/FlightForm";
import HotelForm from "../components/HotelForm";
import MemoryPanel from "../components/MemoryPanel";
import RecommendationPanel from "../components/RecommendationPanel";

export default function Home() {
  const { persona, setPersona, flights, hotels, memoryLog, addMemoryNote } = useAgent();
  const [note, setNote] = useState("");

  const headline = useMemo(
    () =>
      persona === "luxury"
        ? "Luxury Concierge Agent"
        : "Business Efficiency Agent",
    [persona]
  );

  return (
    <main className="page">
      <header className="hero">
        <div className="hero__content">
          <h1>{headline}</h1>
          <p>
            Your autonomous travel planner that remembers available flights,
            required hotels, and tailors itineraries for high-profile travelers.
          </p>
          <div className="persona-selector">
            <button
              className={persona === "business" ? "active" : ""}
              onClick={() => setPersona("business")}
            >
              Business Focus
            </button>
            <button
              className={persona === "luxury" ? "active" : ""}
              onClick={() => setPersona("luxury")}
            >
              Luxury Focus
            </button>
          </div>
        </div>
        <div className="hero__stats">
          <div>
            <h3>{flights.length}</h3>
            <span>Tracked Flights</span>
          </div>
          <div>
            <h3>{hotels.length}</h3>
            <span>Tracked Hotels</span>
          </div>
          <div>
            <h3>{memoryLog.length}</h3>
            <span>Memory Notes</span>
          </div>
        </div>
      </header>

      <section className="cards">
        <div className="card">
          <h2>Remember Available Flights</h2>
          <FlightForm />
        </div>

        <div className="card">
          <h2>Remember Required Hotels</h2>
          <HotelForm />
        </div>
      </section>

      <section className="cards">
        <MemoryPanel />
        <RecommendationPanel />
      </section>

      <section className="insights card">
        <h2>Agent Notes</h2>
        <p>
          Capture any custom preferences or reminders so the agent can tailor
          recommendations even further.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = note.trim();
            if (!trimmed) return;
            addMemoryNote({
              type: "note",
              title: "Curated Preference",
              detail: trimmed,
              timestamp: Date.now()
            });
            setNote("");
          }}
          className="note-form"
        >
          <textarea
            placeholder="e.g. Traveler prefers direct flights before 10AM, suite with skyline view."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <button type="submit">Save Note</button>
        </form>
      </section>
    </main>
  );
}
