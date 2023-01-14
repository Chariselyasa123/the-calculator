import { Link } from "react-router-dom";
import Layout from "./Layout";
import style from "./assets/Welcome.module.css";
import { useAuth } from "../hooks/useAuth";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <Layout title="Welcome">
      <div className={style.welcome}>
        <div className="wrapper noumorphism-outside">
          <h4>Selamat Datang di</h4>
          <h1>The Calculator</h1>
          {!user ? (
            <p>
              Silahkan
              <Link to="/login" className={style.link}>
                Login
              </Link>
              /
              <Link to="/register" className={style.link}>
                Register
              </Link>
              untuk mengakses <span>The Calculator</span>
            </p>
          ) : (
            <div>
              <p>Hallo, {user.name}!</p>
              <i style={{ fontStyle: "italic" }}>
                <Link
                  to="/calculator"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  Klik disini untuk akses{" "}
                  <span className="ml-2">The Calculator</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </i>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Welcome;
