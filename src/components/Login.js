import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

const clientId = '884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com';

const Login = () => {
    const [profile, setProfile] = useState(null);
    
    const onSuccess = (res) => {
      const { email, familyName, givenName, googleId, imageUrl, name } = res.profileObj
      const authToken = res.tokenObj.access_token
      localStorage.setItem("authToken", authToken)
      fetch('https://techcircuit.herokuapp.com/user/gauth', {
          
          // Adding method type
          method: "POST",
            
          // Adding body or contents to send
          body: JSON.stringify({
              email,
              familyName,
              givenName,
              googleId,
              imageUrl,
              name,
              access_token: authToken
          }),
            
          // Adding headers to the request
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
      .then(response => {
        console.log(response.status)
        setProfile(res.profileObj.email)
      })
      .catch(error => console.log(error));
    };

    const onFailure = (res) => {
      console.log('Login failed: res:', res);
    };

    return (
      <div className="login-area">
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
              <div className="authButton">
                  <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
              </div>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
        <div className="profile">
          {profile && <p>logged in successfully as {profile}</p>}
        </div>
      </div>
    );
}

export default Login;