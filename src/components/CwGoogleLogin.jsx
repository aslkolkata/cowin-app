import React, { Component } from "react";
import GoogleLogin from "react-google-login";

class CwGoogleLogin extends Component {
  state = {};

  handleSuccess(response) {
    alert("Google login success; response = " + response);
  }

  handleFailure(response) {
    alert("Google login failure; response = " + response);
  }

  render() {
    return (
      <GoogleLogin
        clientId="424801535165-dfob4tr4dgnhoa17m36hragqfiqa8s31.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.handleSuccess}
        onFailure={this.handleSuccess}
        cookiePolicy={"single_host_origin"}
      />
    );
  }
}

export default CwGoogleLogin;
