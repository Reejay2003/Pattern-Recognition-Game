"use client";

import Grid from "@/components/ui/nui/Grid";
import { useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [continu, setContinu] = useState(true);

  const handlePatternEnd = (correct: boolean) => {
    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
    } else {
      setScore(0);
      setContinu(false);
      setTimeout(() => setContinu(true), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="mb-4">
        <h2 className="text-2xl">Score: {score}</h2>
        <h2 className="text-2xl">High Score: {highScore}</h2>
      </div>

      {continu ? (
        <Grid onPatternEnd={handlePatternEnd} />
      ) : (
        <div className="mt-4 text-center">
          <p className="text-3xl font-bold text-red-500">Haha!!!</p>
          <p className="text-6xl  font-bold text-red-500">You Lost</p>
        </div>
      )}
    </div>
  );
}
