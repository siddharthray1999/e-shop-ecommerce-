import React from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../Assests/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../Components/Card/Card";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const LoginUser = (e) => {
    e.preventDefault();
    console.log(email, password);
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login successfully");
        setIsLoading(false);
        navigate("/");
        // ...
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  // login with google
  const provider = new GoogleAuthProvider();
  const SignWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("login successfully")
        navigate("/")
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="loginimg" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={LoginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.link}>
                <Link to="/Reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>

            <button
              className="--btn --btn-danger --btn-block"
              onClick={SignWithGoogle}
            >
              <FaGoogle />
              Login With Google
            </button>
            <span className={styles.register}>
              <p>
                Don't have an account? <Link to="/Register">Register</Link>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
