import Button from "./Button";
import style from "./assets/Buttons.module.css";

const Buttons = ({ onClick }) => {
  return (
    <div className={style.buttonGroup}>
      <Button value="AC" onClick={(e) => onClick("ac", "ac")} />
      <Button value="power" onClick={(e) => onClick("power", "power")} />
      <Button value="%" onClick={(e) => onClick("%", "%")} />
      <Button
        value="/"
        className={style.operator}
        onClick={(e) => onClick("/", "operator")}
      />
      <Button value={7} onClick={(e) => onClick(7, "number")} />
      <Button value={8} onClick={(e) => onClick(8, "number")} />
      <Button value={9} onClick={(e) => onClick(9, "number")} />
      <Button
        value="x"
        className={style.operator}
        onClick={(e) => onClick("x", "operator")}
      />
      <Button value={4} onClick={(e) => onClick(4, "number")} />
      <Button value={5} onClick={(e) => onClick(5, "number")} />
      <Button value={6} onClick={(e) => onClick(6, "number")} />
      <Button
        value="-"
        className={style.operator}
        onClick={(e) => onClick("-", "operator")}
      />
      <Button value={1} onClick={(e) => onClick(1, "number")} />
      <Button value={2} onClick={(e) => onClick(2, "number")} />
      <Button value={3} onClick={(e) => onClick(3, "number")} />
      <Button
        value="+"
        className={style.operator}
        onClick={(e) => onClick("+", "operator")}
      />
      <Button
        value={0}
        className={style.span2}
        onClick={(e) => onClick(0, "number")}
      />
      <Button value="." onClick={(e) => onClick(".", "decimal")} />
      <Button value="=" onClick={(e) => onClick("=", "equal")} />
    </div>
  );
};

export default Buttons;
