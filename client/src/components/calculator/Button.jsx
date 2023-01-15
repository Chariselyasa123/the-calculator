import style from "./assets/Button.module.css";

const Button = ({ value, className, onClick }) => {
  return (
    <button
      type="button"
      className={`${style.button} ${className} ${
        value === "=" ? style.equalSign : ""
      }`}
      value={value}
      onClick={(e) => onClick(e)}
    >
      {value === "power" ? (
        <div className={style.power}>
          <var>X</var>
          <sup>2</sup>
        </div>
      ) : (
        value
      )}
    </button>
  );
};

export default Button;
