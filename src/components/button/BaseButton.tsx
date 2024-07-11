interface ButtonProps {
  title: string;
  size?: "lg" | "md" | "sm";
  bgColor?: "primary" | "secondary";
  onClick?: () => void;
}

/**
 * 기본 버튼
 * @param {ButtonProps} ButtonProps
 * @returns {JSX.Element} Component
 */
export default function BaseButton({
  title,
  size = "md",
  bgColor = "primary",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      // className={`${styles.button} ${styles[size]} ${styles[bgColor]}`}
    >
      {title}
    </button>
  );
}
