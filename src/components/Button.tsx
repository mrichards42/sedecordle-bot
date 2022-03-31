import classNames from "classnames";

export const TextButton = ({ className, ...props }: any) => (
  <button
    className={classNames("p-2 border border-current", className)}
    type="button"
    {...props}
  />
);

export const SymbolButton = ({ className, ...props }: any) => (
  <TextButton
    // Font sizes correspond to xl and 2xl, but without the line spacing
    className={classNames(
      "aspect-square text-[1.25rem] md:text-[1.5rem] leading-none",
      className
    )}
    {...props}
  />
);

export const Button = ({ children, ...props }: any) =>
  typeof children === "string" && children.match(/\p{Other_Symbol}/u) ? (
    <SymbolButton children={children} {...props} />
  ) : (
    <TextButton children={children} {...props} />
  );

export const PromptButton = ({ title, value, onChange, ...props }: any) => (
  <Button
    onClick={() => {
      const result = prompt(title, value);
      if (result != null) {
        onChange(result);
      }
    }}
    {...props}
  >
    {value}
  </Button>
);

export default Button;
