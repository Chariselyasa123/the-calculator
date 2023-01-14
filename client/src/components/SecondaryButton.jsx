import style from "./assets/PrimaryButton.module.css";

export default function SecondaryButton({
  type = "submit",
  className = "",
  processing,
  children,
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.wrapper} ${processing && "opacity-25"} ` + className}
      disabled={processing}
    >
      {children}
    </button>
  );
}
