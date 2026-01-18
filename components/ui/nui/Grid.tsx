"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

const colors = [
  "bg-[#ff5733]",
  "bg-[#ffe033]",
  "bg-[#caff33]",
  "bg-[#33ffe6]",
  "bg-[#3374ff]",
  "bg-[#7433ff]",
  "bg-[#e633ff]",
  "bg-[#ff3342]",
  "bg-[#5b1218]",
];

export default function Grid({
  onPatternEnd,
}: {
  onPatternEnd: (result: "correct" | "lost" | "reset") => void;
}) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isNotPlaying, setIsNotPlaying] = useState(false);
  const [activeBox, setActiveBox] = useState<number | null>(null);
  const [showStartButton, setShowStartButton] = useState(true);
  const [clicked, setClicked] = useState<Record<number, boolean>>({});
  const [level, setLevel] = useState(1);

  const clickLight = (index: number) => {
    setClicked((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setClicked((prev) => ({ ...prev, [index]: false }));
    }, 300);
  };

  const handleBoxClick = (index: number) => {
    if (isNotPlaying || showStartButton) return;

    clickLight(index);
    const nextInput = [...userInput, index];
    setUserInput(nextInput);

    if (pattern[userInput.length] !== index) {
      onPatternEnd("lost");
      resetGame(false);
      return;
    }

    if (nextInput.length === pattern.length) {
      onPatternEnd("correct");
      setTimeout(startGame, 1000);
    }
  };

  const startGame = () => {
    setShowStartButton(false);
    setIsNotPlaying(true);

    const newPattern = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 9)
    );

    setPattern(newPattern);
    setUserInput([]);

    newPattern.forEach((box, index) => {
      setTimeout(() => {
        setActiveBox(box);
        setTimeout(() => setActiveBox(null), 400);

        if (index === newPattern.length - 1) {
          setTimeout(() => setIsNotPlaying(false), 500);
        }
      }, index * 900);
    });
  };

  const resetGame = (manual = true) => {
    setPattern([]);
    setUserInput([]);
    setShowStartButton(true);
    setClicked({});
    setActiveBox(null);
    setIsNotPlaying(false);

    if (manual) {
      onPatternEnd("reset");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Array.from({ length: 9 }, (_, index) => (
        <Card
          key={index}
          className={`h-24 w-24 cursor-pointer ${
            clicked[index] || activeBox === index
              ? colors[index]
              : "bg-gray-500"
          }`}
          onClick={() => handleBoxClick(index)}
        >
          <p className="flex h-full items-center justify-center text-5xl font-bold">
            {index + 1}
          </p>
        </Card>
      ))}

      {showStartButton ? (
        <div className="col-span-3 mt-4 flex justify-center gap-4">
          <button
            className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
            onClick={startGame}
          >
            Start Game
          </button>
          <button
            className="rounded bg-red-600 px-4 py-2 hover:bg-red-500"
            onClick={() => resetGame(true)}
          >
            Reset Game
          </button>
        </div>
      ) : (
        <button
          className="col-span-3 rounded bg-red-600 px-4 py-2 hover:bg-red-500"
          onClick={() => resetGame(true)}
        >
          Reset Game
        </button>
      )}
    </div>
  );
}