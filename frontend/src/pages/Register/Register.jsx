
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import InputField from "../../components/InputField/InputField";
import Divider from "../../components/Divider/Divider";

import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />

        <p className={styles.headerText}>
          Already on LinkedIn?
          <Link to="/login">Sign in</Link>
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>
            Make the most of your professional life
          </h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.nameRow}>
              <InputField
                label="First name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <InputField
                label="Last name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="Password (6+ characters)"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <p className={styles.agreement}>
              By clicking Agree & Join, you agree to the LinkedIn
              <a href="#" onClick={(event) => event.preventDefault()}>
                User Agreement
              </a>
              ,
              <a href="#" onClick={(event) => event.preventDefault()}>
                Privacy Policy
              </a>
              , and
              <a href="#" onClick={(event) => event.preventDefault()}>
                Cookie Policy
              </a>
              .
            </p>

            <button
              type="submit"
              className={styles.joinButton}
            >
              Agree & Join
            </button>
          </form>

          <Divider />

          <button
            type="button"
            className={styles.googleButton}
          >
            <span className={styles.googleIcon}>G</span>
            Continue with Google
          </button>

          <p className={styles.loginText}>
            Already on LinkedIn?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Register;

