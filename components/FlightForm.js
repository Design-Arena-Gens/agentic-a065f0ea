"use client";

import { useState } from "react";
import { useAgent } from "./AgentContext";

const cabinClasses = ["Economy", "Premium Economy", "Business", "First"];

export default function FlightForm() {
  const { addFlight, persona } = useAgent();
  const [form, setForm] = useState({
    airline: "",
    destination: "",
    departureDate: "",
    price: "",
    cabin: persona === "luxury" ? "First" : "Business"
  });

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const resetForm = () => {
    setForm({
      airline: "",
      destination: "",
      departureDate: "",
      price: "",
      cabin: persona === "luxury" ? "First" : "Business"
    });
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!form.airline || !form.destination || !form.departureDate) return;
        addFlight({
          id: crypto.randomUUID(),
          ...form,
          price: Number(form.price || 0).toFixed(2)
        });
        resetForm();
      }}
    >
      <label>
        Airline
        <input
          value={form.airline}
          onChange={handleChange("airline")}
          placeholder="e.g. Emirates"
          required
        />
      </label>
      <label>
        Destination
        <input
          value={form.destination}
          onChange={handleChange("destination")}
          placeholder="City or Airport"
          required
        />
      </label>
      <label>
        Departure Date
        <input
          type="date"
          value={form.departureDate}
          onChange={handleChange("departureDate")}
          required
        />
      </label>
      <label>
        Cabin Class
        <select value={form.cabin} onChange={handleChange("cabin")}>
          {cabinClasses.map((cabin) => (
            <option key={cabin} value={cabin}>
              {cabin}
            </option>
          ))}
        </select>
      </label>
      <label>
        Price (USD)
        <input
          type="number"
          min="0"
          step="10"
          value={form.price}
          onChange={handleChange("price")}
          placeholder="Optional"
        />
      </label>
      <button type="submit">Remember Flight</button>
    </form>
  );
}
