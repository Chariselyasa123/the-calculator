import style from "./assets/InputLabel.module.css";

export default function InputLabel({ forInput, value, className, children }) {
  return (
    <label htmlFor={forInput} className={style.label + " " + className}>
      {value ? value : children}
    </label>
  );
}
