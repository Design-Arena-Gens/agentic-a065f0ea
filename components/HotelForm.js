"use client";

import { useState } from "react";
import { useAgent } from "./AgentContext";

const stayStyles = ["Executive", "Boutique Luxury", "Resort", "Apartment", "Business Standard"];

export default function HotelForm() {
  const { addHotel, persona } = useAgent();
  const [form, setForm] = useState({
    name: "",
    city: "",
    checkIn: "",
    checkOut: "",
    nightlyRate: "",
    style: persona === "luxury" ? "Boutique Luxury" : "Executive"
  });

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      city: "",
      checkIn: "",
      checkOut: "",
      nightlyRate: "",
      style: persona === "luxury" ? "Boutique Luxury" : "Executive"
    });
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!form.name || !form.city || !form.checkIn || !form.checkOut) return;
        addHotel({
          id: crypto.randomUUID(),
          ...form,
          nightlyRate: Number(form.nightlyRate || 0).toFixed(2)
        });
        resetForm();
      }}
    >
      <label>
        Hotel Name
        <input
          value={form.name}
          onChange={handleChange("name")}
          placeholder="e.g. Ritz-Carlton"
          required
        />
      </label>
      <label>
        City
        <input
          value={form.city}
          onChange={handleChange("city")}
          placeholder="Destination City"
          required
        />
      </label>
      <div className="grid grid--two">
        <label>
          Check-in
          <input type="date" value={form.checkIn} onChange={handleChange("checkIn")} required />
        </label>
        <label>
          Check-out
          <input type="date" value={form.checkOut} onChange={handleChange("checkOut")} required />
        </label>
      </div>
      <label>
        Stay Style
        <select value={form.style} onChange={handleChange("style")}>
          {stayStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </label>
      <label>
        Nightly Rate (USD)
        <input
          type="number"
          min="0"
          step="10"
          value={form.nightlyRate}
          onChange={handleChange("nightlyRate")}
          placeholder="Optional"
        />
      </label>
      <button type="submit">Remember Hotel</button>
    </form>
  );
}
