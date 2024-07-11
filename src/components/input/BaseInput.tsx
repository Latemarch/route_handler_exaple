interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  value,
  placeholder,
  maxLength = 0,
  onChange,
}: InputProps) {
  return (
    <input
      className=""
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
