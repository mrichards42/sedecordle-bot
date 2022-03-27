import classNames from "classnames";

export interface Props {
  letter: string;
  status?: "none" | "present" | "correct";
  size?: "lg" | "md" | "sm";
}

const Letter = ({ letter, status = "none", size = "md" }: Props) => (
  <div
    className={classNames(
      "inline-flex justify-center items-center",
      "uppercase font-bold text-white",
      {
        "bg-gray-500": status === "none",
        "bg-[#c9b458]": status === "present",
        "bg-[#6aaa64]": status === "correct",
        "m-1 w-10 h-10 text-2xl": size === "sm",
        "m-2 w-16 h-16 text-4xl": size === "md",
        "m-3 w-20 h-20 text-5xl": size === "lg",
      }
    )}
  >
    <div>{letter}</div>
  </div>
);

export const LetterDemo = () => {
  const sizes = ["sm", "md", "lg"] as const;
  const statuses = ["none", "present", "correct"] as const;
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return (
    <>
      {sizes.map((size) =>
        statuses.map((status) => (
          <div>
            <div>
              Size = {size}; status = {status}
            </div>
            {letters.map((letter) => (
              <Letter
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

export default Letter;
