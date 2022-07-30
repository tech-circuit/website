import React from "react";
import "../styles/signin.css";
import "../styles/all.css";
import Footer from "./Footer";
import GoogleLoginButton from "./GoogleLoginButton";

function SignUp() {
    return (
        <>
            <div className="signup-cont">
                <div className="signup-wrap">
                    <div className="signup-main">
                        <img
                            src="/assets/fulllogo.png"
                            alt="logo"
                            className="logo"
                        />
                        <h3 style={{ fontWeight: "normal" }}>Sign Up</h3>
                        <div className="fields sign-fields signup-fields">
                            <input
                                type="text"
                                name="first-name"
                                autoComplete="off"
                                placeholder="First Name"
                                required="true"
                            ></input>
                            <input
                                type="text"
                                name="last-name"
                                autoComplete="off"
                                placeholder="Last Name"
                                required="true"
                            ></input>
                            <input
                                type="text"
                                name="username"
                                autoComplete="off"
                                placeholder="Username"
                                required="true"
                            ></input>
                            <input
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="Email"
                                required="true"
                            ></input>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                placeholder="Password"
                                required="true"
                            ></input>
                        </div>
                        <button className="hero-btn">Register</button>
                        <div className="align-p">
                            <a className="underlined-link" href="/">
                                Forgot Password?
                            </a>
                        </div>
                        <GoogleLoginButton/>
                    </div>
                    <div className="text">
                        <p>
                            Already have an account?{" "}
                            <a className="underlined-link" href="/login">
                                Login
                            </a>
                        </p>
                        <p>
                            By clicking Sign Up, you agree to our{" "}
                            <span className="underlined-link">
                                Privacy Poicy
                            </span>{" "}
                            and{" "}
                            <span className="underlined-link">
                                Terms of Service
                            </span>
                        </p>
                        <div className="signup-span">
                            <input
                                type="checkbox"
                                id="updates"
                                name="updates"
                            />
                            &nbsp; &nbsp;
                            <p>
                                Recieve ocassional updates and content from
                                techCircuit via e-mail.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignUp;
