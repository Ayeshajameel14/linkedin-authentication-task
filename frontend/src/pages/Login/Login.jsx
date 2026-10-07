import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import InputField from "../../components/InputField/InputField";
import Divider from "../../components/Divider/Divider";

import loginIllustration from "../../assets/login-illustration.png";

import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      console.log("Logged in user:", data.user);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.loginSection}>
          <h1 className={styles.title}>
            Welcome to your
            <br />
            professional community
          </h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <InputField
              label="Email or phone"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder=""
            />

            <div className={styles.passwordField}>
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder=""
              />

              <button
                type="button"
                className={styles.showButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <Link to="#" className={styles.forgotPassword}>
              Forgot password?
            </Link>

            <button
              type="submit"
              className={styles.signInButton}
            >
              Sign in
            </button>
          </form>

          <Divider />

          <button
            type="button"
            className={styles.googleButton}
          >
            <span className={styles.googleIcon}>G</span>
            Sign in with Google
          </button>

          <Link
            to="/register"
            className={styles.joinButton}
          >
            New to LinkedIn? Join now
          </Link>
        </section>

        <section className={styles.illustration}>
          <img
            src={loginIllustration}
            alt="Login illustration"
            className={styles.loginImage}
          />
        </section>
      </main>
    </div>
  );
}

export default Login;