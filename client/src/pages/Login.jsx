import Layout from "./Layout";
import { useState } from "react";
import InputLabel from "../components/InputLabel";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import InputError from "../components/InputError";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      delete data.accessToken;

      login(data);
    } catch (error) {
      if (error.response && error.response.status) {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
    }
  };

  return (
    <Layout title="Login">
      <div className="container">
        <div className="wrapper noumorphism-outside">
          <h1 className="flex justify-center text-3xl mb-2">Login</h1>

          <InputError
            message={errorMessage}
            className="flex justify-center mb-4"
          />

          <form onSubmit={handleSubmit}>
            <div>
              <InputLabel forInput="email" value="Email" />

              <TextInput
                id="email"
                name="email"
                type="email"
                required={true}
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <InputLabel forInput="password" value="Password" />

              <TextInput
                id="password"
                name="password"
                type="password"
                required={true}
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex mt-7 justify-between">
              <div className="flex items-center justify-center">
                <Link to="/register">Belum punya akun?</Link>
              </div>

              <PrimaryButton>Login</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
