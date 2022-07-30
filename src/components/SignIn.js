import React from "react";
import "../styles/signin.css";
import "../styles/all.css";
import Footer from "./Footer";
import GoogleLoginButton from "./GoogleLoginButton";

function SignIn() {
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
                        <h3 style={{ fontWeight: "normal" }}>Login</h3>
                        <div className="fields sign-fields">
                            <input
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="E-mail pr username"
                                required="true"
                                className="sign-username"
                            ></input>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                placeholder="Password"
                                required="true"
                            ></input>
                        </div>
                        <button className="hero-btn">Login</button>
                        <div className="align-p">
                            <a className="underlined-link" href="/">
                                Forgot Password?
                            </a>
                        </div>
                        <GoogleLoginButton/>
                    </div>
                    <div className="text">
                        <p>
                            Don't have an account?{" "}
                            <a
                                className="underlined-link"
                                href="/register"
                            >
                                Sign up{" "}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SignIn;
