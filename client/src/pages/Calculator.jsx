import SecondaryButton from "../components/SecondaryButton";
import Layout from "./Layout";
import style from "./assets/Calculator.module.css";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import Display from "../components/calculator/Display";
import Buttons from "../components/calculator/Buttons";
import { useState } from "react";
import { convertPembilang } from "../utils/helper";

const Calculator = () => {
  const { logout } = useAuth();
  const [display, setDisplay] = useState("");
  const [displayOperation, setDisplayOperation] = useState("");
  const [operatorClicked, setOperatorClicked] = useState(0);
  const [currentValue, setCurrentValue] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [operator, setOperator] = useState("");
  const [totals, setTotals] = useState(0);
  const [pembilang, setPembilang] = useState("");
  const [activePembilang, setActivePembilang] = useState(false);

  const allClear = () => {
    setDisplay("");
    setDisplayOperation("");
    setOperatorClicked("");
    setCurrentValue(0);
    setPrevValue("");
    setOperator("");
    setTotals(0);
  };

  const inputNumber = (number) => {
    if (currentValue === "0") {
      setCurrentValue(number);
      setPembilang(convertPembilang(number));
    } else {
      let curVal = currentValue;
      setCurrentValue((curVal += number));
      setPembilang(convertPembilang((curVal += number)));
    }
  };

  const inputOperator = (op, value) => {
    if (currentValue === "") return;
    setPrevValue(value || currentValue);
    setOperator(op);
    setDisplay("");
    setCurrentValue("");
    setDisplayOperation(currentValue + op);
  };

  const inputDecimal = (dot) => {
    if (currentValue.includes(".")) {
      return;
    }
    setCurrentValue((prev) => (prev += dot));
    setDisplay((prev) => (prev += dot));
  };

  const operatorFn = (op) => {
    let total = 0;
    if (operatorClicked > 0) {
      total = calculate();
      setCurrentValue(total);
    }

    inputOperator(op, total);
    setOperatorClicked((prev) => prev + 1);
  };

  const percentFn = () => {
    if (prevValue !== "") {
      setCurrentValue(parseFloat(currentValue) / 100);
      setDisplay(parseFloat(currentValue) / 100);
    } else {
      let x = currentValue;
      const curVal = (x /= 100);
      setCurrentValue(curVal);
      setDisplay(curVal);
      setDisplayOperation(curValcurVal);
    }
  };

  const powerFn = () => {
    if (prevValue !== "") {
      setCurrentValue(Math.pow(parseFloat(currentValue), 2));
      setDisplay(Math.pow(parseFloat(currentValue), 2));
    } else {
      const curVal = Math.pow(currentValue, 2);
      setCurrentValue(curVal);
      setDisplay(curVal);
      setDisplayOperation(curVal);
    }
  };

  const hasNumber = (myString) => {
    return /\d/.test(myString);
  };

  const equals = () => {
    calculate();
    if (!hasNumber(displayOperation) || !displayOperation) return;
    setDisplay("");
    setDisplayOperation(displayOperation + currentValue + "=");
  };

  const calculate = () => {
    let total = 0;
    switch (operator) {
      case "+":
        total = parseFloat(prevValue) + parseFloat(currentValue);
        break;
      case "-":
        total = parseFloat(prevValue) - parseFloat(currentValue);
        break;
      case "x":
        total = parseFloat(prevValue) * parseFloat(currentValue);
        break;
      case "/":
        total = parseFloat(prevValue) / parseFloat(currentValue);
        break;
      default:
        total = parseFloat(currentValue);
        break;
    }
    // prevent total from displaying NaN
    if (isNaN(total)) return;
    setTotals(total);
    return total;
  };

  const updateDisplay = (value) => {
    if (display.replaceAll(/\s/g, "").length >= 16) return;
    let number = value;
    if (number == "1") number = `  ${number}`;
    setDisplay(display + number);
  };

  const handleClick = (value, type) => {
    switch (type) {
      case "number":
        inputNumber(value);
        updateDisplay(value);
        break;
      case "operator":
        operatorFn(value);
        break;
      case "equal":
        equals();
        break;
      case "ac":
        allClear();
        break;
      case "%":
        percentFn();
        break;
      case "power":
        powerFn();
        break;
      case "decimal":
        inputDecimal(value);
        break;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="The Calculator">
      <div className="container">
        <div className={style.header}>
          <div className={style.theCalculator}>
            <h2>The Calculator</h2>
            <SecondaryButton
              type="button"
              className="flex items-center"
              onClick={handleLogout}
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </SecondaryButton>
          </div>
          <div className={style.menu}>
            <div className={style.checkbox}>
              <input
                type="checkbox"
                id="check"
                checked={activePembilang}
                onChange={() => setActivePembilang(!activePembilang)}
              />
              <label htmlFor="check">Pembilang</label>
            </div>
          </div>
        </div>

        <div className={`${style.wrapper} noumorphism-outside`}>
          <Display
            display={display}
            displayOperation={displayOperation}
            totals={totals}
          />
          <p
            style={{ display: "flex" }}
            className="noumorphism-outside text-sm"
          >
            {activePembilang && pembilang}
          </p>
          <Buttons onClick={handleClick} />
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
