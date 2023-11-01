import classNames from "classnames";

type InputType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  focusColor?:
    | "violet"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "lime"
    | "cyan";
  rounded?: "none" | "md" | "full";
};

const Input = ({
  value,
  onChange,
  placeholder,
  focusColor = "pink",
  rounded = "none",
}: InputType) => {
  return (
    <input
      className={classNames(
        "w-72 md:w-full max-w-md border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] focus:placeholder:text-slate-500 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]",
        { "focus:bg-violet-200": focusColor === "violet" },
        { "focus:bg-pink-200": focusColor === "pink" },
        { "focus:bg-red-200": focusColor === "red" },
        { "focus:bg-orange-200": focusColor === "orange" },
        { "focus:bg-yellow-200": focusColor === "yellow" },
        { "focus:bg-lime-200": focusColor === "lime" },
        { "focus:bg-cyan-200": focusColor === "cyan" },
        { "rounded-none": rounded === "none" },
        { "rounded-md": rounded === "md" },
        { "rounded-full": rounded === "full" }
      )}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
