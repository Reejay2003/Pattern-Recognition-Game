import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const colors = ["bg-[#ff5733]", "bg-[#ffe033]", "bg-[#caff33]", "bg-[#33ffe6]", "bg-[#3374ff]", "bg-[#7433ff]", "bg-[#e633ff]", "bg-[#ff3342]", "bg-[#5b1218]"];

export default function Grid({ onPatternEnd }: { onPatternEnd: (correct: boolean) => void }) {
    const [pattern, setPattern] = useState<number[]>([]);
    const [userInput, setUserInput] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeBox, setActiveBox] = useState<number | null>(null);
    const [showStartButton, setShowStartButton] = useState(true);
    const [clicked, setClicked] = useState<{ [key: number]: boolean }>({});

    const clickLight = (index: number) => {
        setClicked((prev) => ({ ...prev, [index]: true }));
        setTimeout(() => {
            setClicked((prev) => ({ ...prev, [index]: false }));
        }, 300);
    };

    const handleBoxClick = (index: number) => {
        if (isPlaying) return;

        clickLight(index);
        setUserInput((prev) => [...prev, index]);

        if (pattern[userInput.length] !== index) {
            onPatternEnd(false);
            setShowStartButton(true);
            resetGame();
        } else if (userInput.length + 1 === pattern.length) {
            onPatternEnd(true);
            setTimeout(() => startGame(), 1000);
        }
    };

    const startGame = () => {
        setShowStartButton(false);
        setIsPlaying(true);
        const patternLength = Math.floor(Math.random() * 5) + 1;
        const newPattern = Array.from({ length: patternLength }, () => Math.floor(Math.random() * 9));
        setPattern(newPattern);
        setUserInput([]);

        newPattern.forEach((box, index) => {
            setTimeout(() => {
                setActiveBox(box);
                setTimeout(() => setActiveBox(null), 500);
                if (index === newPattern.length - 1) setTimeout(() => setIsPlaying(false), 500);
            }, index * 1000);
        });
    };

    const resetGame = () => {
        setPattern([]);
        setUserInput([]);
        setShowStartButton(true);
        setClicked({});
        setActiveBox(null);
        onPatternEnd(false);
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {Array.from({ length: 9 }, (_, index) => (
                <Card
                    key={index}
                    id={`box-${index}`}
                    className={`h-24 w-24 cursor-pointer ${clicked[index] ? colors[index] : activeBox === index ? colors[index] : "bg-gray-500"}`}
                    onClick={() => handleBoxClick(index)}
                >
                    <p className="flex items-center justify-center font-bold text-5xl">{index + 1}</p>
                </Card>
            ))}

            {showStartButton && (
                <div className="col-span-3 mt-4 flex justify-center gap-4">
                    <button className="p-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500" onClick={startGame}>
                        Start Game
                    </button>
                    <button className="p-2 px-4 bg-red-600 text-white rounded hover:bg-red-500" onClick={resetGame}>
                        Reset Game
                    </button>
                </div>
            )}
            {!showStartButton && (
                <button className="flex justify-center w-full p-2 px-4 bg-red-600 text-white rounded hover:bg-red-500" onClick={resetGame}>
                    Reset Game
                </button>
            )}
        </div>
    );
}
