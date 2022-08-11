import React from "react";
import "../styles/signin.css";
import "../styles/all.css";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import notyf from "../tcNotyf";

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
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        if (formErrors.length === 0) {
            notyf.success("Logged In successfully!");
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
        if (!values.email) {
            errors.email = "Email is required!";
        }

        if (!regex.test(values.email)) {
            errors.email = "This is not a valid email!";
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
                        <div className="fields sign-fields">
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
                        <button className="hero-btn">Login</button>
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
