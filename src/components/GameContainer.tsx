import classNames from "classnames";
import { useState } from "react";
import useQueryParam from "../hooks/useQueryParam";
import { decodeGameId, encodeGameId, randSeed } from "../util";
import MultiGame from "./MultiGame";
import { Props as WordleProps } from "./Wordle";

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

const FlatButton = ({ className, ...props }: any) => (
  <button
    className={classNames("p-2 border border-current", className)}
    type="button"
    {...props}
  />
);

const SymbolButton = ({ className, ...props }: any) => (
  <FlatButton
    // Font sizes correspond to xl and 2xl, but without the line spacing
    className={classNames(
      "aspect-square text-[1.25rem] md:text-[1.5rem] leading-none p-0",
      className
    )}
    {...props}
  />
);

const PromptButton = ({ label, value, onChange, ...props }: any) => (
  <FlatButton
    onClick={() => {
      const result = prompt(label, value);
      if (result != null) {
        onChange(result);
      }
    }}
    {...props}
  >
    {value}
  </FlatButton>
);

const HintsButton = ({ hintLevel, onClick }: any) => (
  <SymbolButton
    onClick={(e: any) => {
      onClick();
      e.target.blur();
    }}
    title={
      hintLevel === 2
        ? "Remove hints"
        : hintLevel === 1
        ? "More hints"
        : "Show hints"
    }
  >
    {hintLevel === 2 ? "✺" : hintLevel === 1 ? "❋" : "❉"}
  </SymbolButton>
);

export interface Props {
  defaultCount?: number;
  defaultSize?: WordleProps["size"];
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
        <FlatButton onClick={() => setGameId(newGameId(count))}>New</FlatButton>
        <FlatButton onClick={() => setSize("xs")}>xs</FlatButton>
        <FlatButton onClick={() => setSize("sm")}>sm</FlatButton>
        <FlatButton onClick={() => setSize("md")}>md</FlatButton>
        <FlatButton onClick={() => setSize("lg")}>lg</FlatButton>
        <div className="flex-grow" />
        <PromptButton
          title="Number"
          value={count}
          onChange={(count: string) => setGameId(newGameId(+count))}
        />
        <PromptButton title="Game id" value={gameId} onChange={setGameId} />
        <HintsButton
          hintLevel={hintLevel}
          onClick={() => setHintLevel((hintLevel + 1) % 3)}
        />
        <SymbolButton onClick={toggleFullscreen}>⛶</SymbolButton>
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
