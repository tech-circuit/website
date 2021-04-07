import React from 'react';

import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button'

const clientId = '884360040700-4093n49it73naktrttlljb9ad6ga4jjo.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log(res.profileObj)
    const authToken = res.tokenObj.access_token
    localStorage.setItem("authToken", authToken)
    // send api request to add user
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div>
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
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;