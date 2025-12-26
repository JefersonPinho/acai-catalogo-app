"use client";

import { useEffect, useState } from "react";

export function SnowEffect() {
  const [flakes, setFlakes] = useState<
    {
      id: number;
      left: string;
      animationDuration: string;
      animationDelay: string;
      fontSize: string;
    }[]
  >([]);

  useEffect(() => {
    const generatedFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${Math.random() * 10 + 8}px`,
    }));
    setFlakes(generatedFlakes);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
