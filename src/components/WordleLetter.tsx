import classNames from "classnames";
import { LetterScore } from "../game";
import Letter from "./Letter";

export interface Props {
  letter: string;
  status?: "invalid" | "unknown" | LetterScore;
  size?: "lg" | "md" | "sm" | "xs";
}

const WordleLetter = ({ letter, status = "unknown", size = "md" }: Props) => (
  <Letter
    letter={letter}
    className={classNames({
      "border border-current text-white": status === "unknown",
      "border border-current text-red-500": status === "invalid",
      "bg-gray-500 text-white": status === "missing",
      "bg-[#b59f3b] text-white": status === "present",
      "bg-[#538d4e] text-white": status === "correct",
      "m-px w-5 h-5 text-md": size === "xs",
      "m-px w-8 h-8 text-xl": size === "sm",
      "m-0.5 w-10 h-10 text-2xl": size === "md",
      "m-1 w-16 h-16 text-4xl": size === "lg",
    })}
  />
);

export const LetterDemo = () => {
  const sizes = ["sm", "md", "lg"] as const;
  const statuses = ["unknown", "missing", "present", "correct"] as const;
  const letters = " abcdefghijklmnopqrstuvwxyz".split("");
  return (
    <>
      {sizes.map((size) =>
        statuses.map((status) => (
          <div>
            <div>
              Size = {size}; status = {status}
            </div>
            {letters.map((letter) => (
              <WordleLetter
                key={`${letter}-${size}-${status}`}
                letter={letter}
                size={size}
                status={status}
              />
            ))}
          </div>
        ))
      )}
    </>
  );
};

export default WordleLetter;
