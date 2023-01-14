import style from "./assets/InputError.module.css";

export default function InputError({ message, className = "" }) {
  return message ? (
    <p className={`text-sm  ${style.error} ` + className}>{message}</p>
  ) : null;
}
