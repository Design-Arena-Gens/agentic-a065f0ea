"use client";

import { useMemo } from "react";
import { useAgent } from "./AgentContext";

function scoreFlight(flight, persona) {
  let score = 0;
  if (persona === "luxury") {
    if (flight.cabin === "First") score += 4;
    if (flight.cabin === "Business") score += 2;
    score -= Number(flight.price || 0) / 5000;
  } else {
    if (flight.cabin === "Business") score += 3;
    if (flight.cabin === "Premium Economy") score += 2;
    if (flight.cabin === "Economy") score += 1;
    score -= Number(flight.price || 0) / 1000;
  }
  if (flight.destination.toLowerCase().includes("hub")) {
    score += persona === "luxury" ? 1 : 2;
  }
  return score;
}

function scoreHotel(hotel, persona) {
  let score = 0;
  if (persona === "luxury") {
    if (hotel.style.includes("Luxury") || hotel.style.includes("Resort")) score += 4;
    if (hotel.style.includes("Suite") || hotel.style.includes("Penthouse")) score += 3;
    score -= Number(hotel.nightlyRate || 0) / 1500;
  } else {
    if (hotel.style.includes("Executive") || hotel.style.includes("Business")) score += 3;
    score -= Number(hotel.nightlyRate || 0) / 500;
  }
  if (hotel.city.toLowerCase().includes("financial")) {
    score += persona === "business" ? 2 : 1;
  }
  return score;
}

export default function RecommendationPanel() {
  const { flights, hotels, persona } = useAgent();

  const recommendation = useMemo(() => {
    if (flights.length === 0 || hotels.length === 0) {
      return null;
    }
    const bestFlight = [...flights].sort((a, b) => scoreFlight(b, persona) - scoreFlight(a, persona))[0];
    const bestHotel = [...hotels].sort((a, b) => scoreHotel(b, persona) - scoreHotel(a, persona))[0];

    const narrative =
      persona === "luxury"
        ? `Reserve a chauffeured transfer to ${bestHotel.name}; concierge will have a welcome amenity waiting.`
        : `Schedule a ride-share aligned with morning meetings near ${bestHotel.name} to maximize productivity.`;

    return {
      flight: bestFlight,
      hotel: bestHotel,
      narrative
    };
  }, [flights, hotels, persona]);

  return (
    <div className="card recommendation">
      <h2>Tailored Itinerary</h2>
      {recommendation ? (
        <div className="recommendation__grid">
          <div>
            <h3>Flight</h3>
            <p>
              <strong>{recommendation.flight.airline}</strong> to {recommendation.flight.destination}
            </p>
            <p>{recommendation.flight.departureDate}</p>
            <p>
              {recommendation.flight.cabin} · $
              {Number(recommendation.flight.price || 0).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </p>
          </div>
          <div>
            <h3>Hotel</h3>
            <p>
              <strong>{recommendation.hotel.name}</strong> in {recommendation.hotel.city}
            </p>
            <p>
              {recommendation.hotel.checkIn} → {recommendation.hotel.checkOut}
            </p>
            <p>
              {recommendation.hotel.style} · $
              {Number(recommendation.hotel.nightlyRate || 0).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
              /night
            </p>
          </div>
          <div className="narrative">
            <h3>Concierge Insight</h3>
            <p>{recommendation.narrative}</p>
          </div>
        </div>
      ) : (
        <p className="muted">
          Add at least one flight and hotel to produce an itinerary tailored to the selected persona.
        </p>
      )}
    </div>
  );
}
