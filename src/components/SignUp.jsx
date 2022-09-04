import React from "react";
import "../styles/signin.css";
import "../styles/all.css";
import Footer from "./Footer";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import notyf from "../tcNotyf";
import BASE_API_URL from "../constants";

function SignUp() {
    const initialValues = {
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
    };
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting");
        setLoading(true);
        setFormErrors(validate(formValues));
        if (Object.keys(formErrors).length === 0) {
            try {
                const res = await (
                    await fetch(`${BASE_API_URL}/auth/signup`, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                        body: JSON.stringify({
                            ...formValues,
                            firstname: formValues.fname,
                            lastname: formValues.lname,
                        }),
                    })
                ).json();
                if (!res.success) {
                    setMessage(res.error);
                    return notyf.error(res.error);
                }
                setMessage(
                    "Registered successfully! Check your email for verification"
                );
                notyf.success(
                    "Registered successfully! Check your email for verification"
                );
            } catch (err) {
                setMessage(err.toString());
                notyf.error(err.toString());
            }
        } else {
            setMessage(formErrors[0]);
        }
        setLoading(false);
    };

    const validate = (values) => {
        const errors = {};
        const regex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );

        if (!values.fname) {
            errors.fname = "First name is required!";
        }

        if (!values.lname) {
            errors.lname = "Last name is required!";
        }

        if (!values.username) {
            errors.username = "Username is required!";
        }

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
        console.log(errors);
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
                        <h2 style={{ fontWeight: "normal" }}>Sign Up</h2>
                        <p>{message}</p>
                        <div className="fields sign-fields signup-fields">
                            <input
                                type="text"
                                name="fname"
                                autoComplete="off"
                                placeholder="First Name"
                                value={formValues.fname}
                                onChange={handleChange}
                            ></input>
                            <p className="error-msg">{formErrors.fname}</p>
                            <input
                                type="text"
                                name="lname"
                                autoComplete="off"
                                placeholder="Last Name"
                                value={formValues.lname}
                                onChange={handleChange}
                            ></input>
                            <p className="error-msg">{formErrors.lname}</p>
                            <input
                                type="text"
                                name="username"
                                autoComplete="off"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                            ></input>
                            <p className="error-msg">{formErrors.username}</p>
                            <input
                                type="text"
                                name="email"
                                autoComplete="off"
                                placeholder="Email"
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
                        <button
                            disabled={loading}
                            type="submit"
                            className="hero-btn"
                        >
                            Register
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
