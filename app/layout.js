"use client";

import "./globals.css";
import { useState } from "react";
import { AgentProvider } from "../components/AgentContext";

export default function RootLayout({ children }) {
  const [persona, setPersona] = useState("business");

  return (
    <html lang="en">
      <body>
        <AgentProvider persona={persona} onPersonaChange={setPersona}>
          {children}
        </AgentProvider>
      </body>
    </html>
  );
}
