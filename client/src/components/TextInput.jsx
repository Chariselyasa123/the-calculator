import { forwardRef, useEffect, useRef } from "react";
import style from "./assets/TextInput.module.css";

export default forwardRef(function TextInput(
  {
    type = "text",
    name,
    id,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder = "",
    isError = false,
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);

  return (
    <div className={style.wrapper + " mt-1"}>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={
          `${isError && "input-error"} noumorphism-outside ` + className
        }
        ref={input}
        autoComplete={autoComplete}
        required={required}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
      />
    </div>
  );
});
