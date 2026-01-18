"use client";

import { useState } from "react";
import Grid from "@/components/ui/nui/Grid";

type GameState = "playing" | "lost" | "reset";

export default function Home() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>("playing");

  const handlePatternEnd = (result: "correct" | "lost" | "reset") => {
    if (result === "correct") {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
    }

    if (result === "lost") {
      setScore(0);
      setGameState("lost");
      setTimeout(() => setGameState("playing"), 3000);
    }

    if (result === "reset") {
      setScore(0);
      setGameState("reset");
      setTimeout(() => setGameState("playing"), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="mb-4 text-center">
        <h2 className="text-2xl">Score: {score}</h2>
        <h2 className="text-2xl">High Score: {highScore}</h2>
      </div>

      {gameState === "playing" && (
        <Grid onPatternEnd={handlePatternEnd} />
      )}

      {gameState === "lost" && (
        <div className="mt-6 text-center">
          <p className="text-3xl font-bold text-red-500">Haha!!!</p>
          <p className="text-6xl font-bold text-red-500">You Lost</p>
        </div>
      )}

      {gameState === "reset" && (
        <div className="mt-6 text-center">
          <p className="text-4xl font-bold text-green-400">
            Game reset. Good luck!
          </p>
        </div>
      )}
    </div>
  );
}