"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AgentContext = createContext(null);

export function AgentProvider({ children, persona: initialPersona, onPersonaChange }) {
  const [persona, setPersonaState] = useState(initialPersona ?? "business");
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [memoryLog, setMemoryLog] = useState([]);

  const setPersona = useCallback((nextPersona) => {
    setPersonaState(nextPersona);
    if (onPersonaChange) {
      onPersonaChange(nextPersona);
    }
    setMemoryLog((prev) => [
      {
        type: "persona",
        title: "Persona switched",
        detail: `Agent now optimizes for ${nextPersona === "luxury" ? "luxury amenities" : "business efficiency"}.`,
        timestamp: Date.now()
      },
      ...prev
    ]);
  }, [onPersonaChange]);

  const addFlight = useCallback((flight) => {
    setFlights((prev) => [flight, ...prev]);
    setMemoryLog((prev) => [
      {
        type: "flight",
        title: `Flight to ${flight.destination}`,
        detail: `${flight.airline} · ${flight.departureDate} · ${flight.cabin}`,
        timestamp: Date.now()
      },
      ...prev
    ]);
  }, []);

  const addHotel = useCallback((hotel) => {
    setHotels((prev) => [hotel, ...prev]);
    setMemoryLog((prev) => [
      {
        type: "hotel",
        title: `${hotel.name} in ${hotel.city}`,
        detail: `${hotel.checkIn} → ${hotel.checkOut} · ${hotel.style}`,
        timestamp: Date.now()
      },
      ...prev
    ]);
  }, []);

  const addMemoryNote = useCallback((note) => {
    setMemoryLog((prev) => [note, ...prev]);
  }, []);

  const value = useMemo(
    () => ({
      persona,
      setPersona,
      flights,
      addFlight,
      hotels,
      addHotel,
      memoryLog,
      addMemoryNote
    }),
    [persona, flights, hotels, memoryLog, setPersona, addFlight, addHotel, addMemoryNote]
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within an AgentProvider");
  }
  return context;
}
