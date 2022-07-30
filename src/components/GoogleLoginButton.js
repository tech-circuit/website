
import React from "react";
import { GoogleLogin } from "react-google-login";
import BASE_API_URL from "../constants";

const clientId = "884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com";

function GoogleLoginButton() {
    const onSuccess = (res) => {
        const { email, familyName, givenName, googleId, imageUrl, name } =
            res.profileObj;
        const authToken = res.tokenObj.access_token;
        localStorage.removeItem("authToken");
        localStorage.removeItem("pfp");
        localStorage.setItem("pfp", imageUrl);
        localStorage.setItem("authToken", authToken);
        fetch(`${BASE_API_URL}/user/gauth`, {
            method: "POST",
            body: JSON.stringify({
                email,
                familyName,
                givenName,
                googleId,
                imageUrl,
                name,
                access_token: authToken,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(async (response) => {
                const res = await response.json();
                const { setUp } = res.user;
                if (!setUp) {
                    window.location.href = "/profile-setup";
                } else {
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 100);
                }
            })
            .catch((error) => console.log(error));
    };

    const onFailure = (res) => {
        console.log("Login failed: res:", res);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            render={(renderProps) => (
                <button
                    className={"hero-btn"}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                >
                    Login with Google
                </button>
            )}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
            isSignedIn={false}
        />
    )
}

export default GoogleLoginButton;