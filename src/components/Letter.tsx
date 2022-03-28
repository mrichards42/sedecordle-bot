import classNames from "classnames";

export interface Props {
  letter: string;
  className?: string;
}

const Letter = ({ letter, className }: Props) => (
  <div
    className={classNames(
      "inline-flex justify-center items-center",
      "uppercase font-bold",
      className
    )}
  >
    <div className="whitespace-pre">{letter || " "}</div>
  </div>
);

export default Letter;
