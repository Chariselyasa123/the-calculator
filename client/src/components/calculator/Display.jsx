import style from "./assets/Display.module.css";

const Display = ({ display, totals, displayOperation }) => {
  console.log(display);
  return (
    <div className={style.wrapper}>
      <div className={style.displayWrapper}>
        <div className={style.ring}>
          {/* Calculation */}
          <div className={style.calculation}>{displayOperation || ""}</div>

          {/* Input */}
          <div className={style.input}>{display || totals}</div>
        </div>
      </div>
    </div>
  );
};

export default Display;
