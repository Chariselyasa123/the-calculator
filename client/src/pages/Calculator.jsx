import SecondaryButton from "../components/SecondaryButton";
import Layout from "./Layout";
import style from "./assets/Calculator.module.css";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Calculator = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
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
              <input type="checkbox" id="check" />
              <label htmlFor="check">Pembilang</label>
            </div>
          </div>
        </div>

        <div className="wrapper noumorphism-outside">
          <h1>samlekom</h1>
        </div>
      </div>
    </Layout>
  );
};

export default Calculator;
