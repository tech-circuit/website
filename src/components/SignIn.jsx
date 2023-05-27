import React from "react";
import "../styles/signin.css";
import "../styles/all.css";
import Footer from "./Footer";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import notyf from "../tcNotyf";
import BASE_API_URL from "../constants";

function SignIn() {
    const initialValues = {
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsLoading(true);
        if (Object.keys(formErrors).length === 0) {
            try {
                const res = await (
                    await fetch(`${BASE_API_URL}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                        body: JSON.stringify(formValues),
                    })
                ).json();
                if (!res.success) {
                    setMessage(res.error);
                    return notyf.error(res.error);
                }
                localStorage.removeItem("authToken");
                localStorage.removeItem("pfp");
                localStorage.setItem("pfp", res.user.pfp_url);
                localStorage.setItem("authToken", res.user.access_token);
                const { setUp } = res.user;
                if (!setUp) {
                    window.location.href = "/profile-setup";
                } else {
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 100);
                }
            } catch (err) {
                setMessage(err.toString());
                notyf.error(err.toString());
            }
        } else {
            setMessage(formErrors[0]);
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email or Username is required!";
        }

        if (!values.password) {
            errors.password = "Password is required!";
        }

        if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters!";
        }
        return errors;
    };

    return (
        <>
            <div className="signup-cont">
                <div className="signup-wrap">
                    {/* <pre>{JSON.stringify(formValues)}</pre> */}
                    <form className="signup-main" onSubmit={handleSubmit}>
                        <img
                            src="/assets/fulllogo.png"
                            alt="logo"
                            className="logo"
                        />
                        <h2 style={{ fontWeight: "normal" }}>Login</h2>
                        <p style={{ color: "red" }}>{message}</p>
                        <div className="fields sign-fields signup-fields">
                            <input
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="E-mail or username"
                                className="sign-username"
                                value={formValues.email}
                                onChange={handleChange}
                            ></input>
                            <p className="error-msg">{formErrors.email}</p>
                            <input
                                type="password"
                                name="password"
                                autoComplete="off"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            ></input>
                            <p className="error-msg">{formErrors.password}</p>
                        </div>
                        <button disabled={isLoading} className="hero-btn">
                            Login
                        </button>
                        <div className="align-p">
                            <a className="underlined-link" href="/">
                                Forgot Password?
                            </a>
                        </div>
                        <GoogleLoginButton />
                    </form>
                    <div className="text">
                        <p>
                            Don't have an account?{" "}
                            <a className="underlined-link" href="/register">
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
