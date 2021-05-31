import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";
import googleImage from "../../images/google.png";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Login.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  const signInHandler = () => {
    console.log("signin success again");
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
        setUser(newUserInfo);
      });
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);


          // setLoggedInUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.name.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };
  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit}>
        {newUser ? <h3>Create an account</h3> : <h3>Please Login Your Account</h3>}
        {newUser && <input
          defaultValue={loggedInUser.name}
          {...register("name", { required: true })}
          placeholder="Your name"
          onBlur={handleBlur}
          required
        />}
        {errors.name && <span className="error">Name is required</span>}

        <input
          defaultValue={loggedInUser.email}
          {...register("email", { required: true })}
          placeholder="Your email"
          onBlur={handleBlur}
          required
        />
        {errors.email && <span className="error">Email is required</span>}

        <input type="password"
          defaultValue={loggedInUser.password}
          {...register("password", { required: true })}
          placeholder=" password"
          onBlur={handleBlur}
          required
        />
        {errors.password && (
          <span className="error">Password should be more than 6 characters</span>
        )}

        {newUser ? <input type="submit" className="submitBtn" value="Sign Up" />
          :
          <input type="submit" onClick={signInHandler} className="submitBtn" value="Sign In" />
        }
        <h5 className="toggleAccount"> {newUser ? "Already have an account?" : "Create An account!"}  <span style={{ color: "blue", textDecoration: "underline" }} onClick={() => setNewUser(!newUser)}> {newUser ? "Sign In" : "Sign up"} </span>  </h5>

      </form>
      {user.success ? (
        <p style={{ color: "green", textAlign: "center", margin: "10px", fontSize: "18px" }}>
          User {newUser ? "created" : "logged in"} successfuly
        </p>
      ) : (
        <p style={{ color: "red", textAlign: "center", margin: "10px", fontSize: "18px" }}>{user.error}</p>
      )}

      <div className="mediaDiv">
        <button className="mediaStyle p-1" onClick={handleGoogleSignIn}>
          {" "}
          <img
            className="mr-5 "
            src={googleImage}
            style={{ width: "30px", borderRadius: "50%" }}
            alt=""
          />{" "}
          Continue With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
