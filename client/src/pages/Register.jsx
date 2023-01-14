import { useState } from "react";
import InputLabel from "../components/InputLabel";
import PrimaryButton from "../components/PrimaryButton";
import TextInput from "../components/TextInput";
import Layout from "./Layout";
import axios from "axios";
import InputError from "../components/InputError";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          name,
          email,
          password,
          confirmPassword,
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
    <Layout title="Register">
      <div className="container">
        <div className="wrapper noumorphism-outside">
          <h1 className="flex justify-center text-3xl mb-2">Register</h1>

          <InputError
            message={errorMessage}
            className="flex justify-center mb-4"
          />

          <form onSubmit={handleSubmit}>
            <div>
              <InputLabel forInput="name" value="Nama" />

              <TextInput
                id="name"
                name="name"
                type="text"
                required={true}
                value={name}
                handleChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mt-4">
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

            <div className="mt-4">
              <InputLabel forInput="confirmPassword" value="Confirm Password" />

              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required={true}
                value={confirmPassword}
                handleChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex mt-7 justify-between">
              <div className="flex items-center justify-center">
                <Link to="/login">Sudah punya akun?</Link>
              </div>

              <PrimaryButton>Daftar</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
