import React from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const InputText = (props: Props) => {
  const { value, onChange, placeholder } = props;

  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        className="input"
        placeholder={placeholder || "Please Input"}
      />
    </div>
  );
};

export default InputText;
