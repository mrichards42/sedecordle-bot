import { useState } from "react";
import useQueryParam from "../hooks/useQueryParam";
import { decodeGameId, encodeGameId, randSeed } from "../util";
import MultiGame from "./MultiGame";
import { Size } from "./WordleLetter";
import { Button, PromptButton } from "./Button";

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

const newGameId = (count: number) => encodeGameId({ count, seed: randSeed() });

const HintsButton = ({ level, onClick }: any) => (
  <Button
    onClick={(e: any) => {
      onClick();
      e.target.blur();
    }}
    title={
      level === 2 ? "Remove hints" : level === 1 ? "More hints" : "Show hints"
    }
  >
    {level === 2 ? "✺" : level === 1 ? "❋" : "❉"}
  </Button>
);

const sizes: Size[] = ["xs", "sm", "md", "lg"];
const nextSize = (size: Size) =>
  sizes[(sizes.indexOf(size) + 1) % sizes.length];

export interface Props {
  defaultCount?: number;
  defaultSize?: Size;
}

const GameContainer = ({ defaultCount = 1, defaultSize = "md" }: Props) => {
  const [gameId, setGameId] = useQueryParam("game", newGameId(defaultCount));
  const { seed, count } = decodeGameId(gameId);

  const [hintLevel, setHintLevel] = useState(0);
  const [size, setSize] = useState(
    defaultSize ??
      (count === 1 ? "lg" : count < 8 ? "md" : count < 16 ? "sm" : "xs")
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <Button
          onClick={(e: any) => {
            e.target.blur();
            setGameId(newGameId(count));
          }}
        >
          New
        </Button>
        <div className="hidden md:block">
          <Button onClick={() => setSize("xs")}>xs</Button>
          <Button onClick={() => setSize("sm")}>sm</Button>
          <Button onClick={() => setSize("md")}>md</Button>
          <Button onClick={() => setSize("lg")}>lg</Button>
        </div>
        <Button
          className="md:hidden aspect-square"
          onClick={() => setSize(nextSize)}
        >
          {size}
        </Button>
        <PromptButton
          title="Number"
          value={count}
          onChange={(count: string) => setGameId(newGameId(+count))}
        />
        <div className="flex-grow" />
        <PromptButton title="Game id" value={gameId} onChange={setGameId} />
        <HintsButton
          level={hintLevel}
          onClick={() => setHintLevel((hintLevel + 1) % 3)}
        />
        <Button onClick={toggleFullscreen}>⛶</Button>
      </div>
      <MultiGame
        key={gameId}
        count={count}
        seed={seed}
        size={size}
        hintLevel={hintLevel}
      />
    </div>
  );
};

export default GameContainer;
