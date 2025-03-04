import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = {
    isLoggedIn: false
  };

  userRegistration = async () => {
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    let password = document.getElementById("signup-password").value;
    let confirmpassword = document.getElementById("confirmpassword").value;

    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    var data = JSON.stringify({
      fullname: fullname,
      email: email,
      password: password,
      role: role
    });

    try {
      const response = await fetch("http://localhost:9090/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      });
      const result = await response.text();
      alert(result);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  userLogin = async () => {
    let email = document.getElementById("username").value;
    let password = document.getElementById("signin-password").value;

    var data = JSON.stringify({
      email: email,
      password: password
    });

    try {
      const response = await fetch("http://localhost:9090/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: data
      });
      const result = await response.text();
      alert(result);
      this.setState({ isLoggedIn: true });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  userLogout = () => {
    this.setState({ isLoggedIn: false });
  }

  showSignin = () => {
    let popup = document.getElementById("popup");
    popup.style.display = "block";

    let signin = document.getElementById("signin");
    signin.style.display = "block";
    let signup = document.getElementById("signup");
    signup.style.display = "none";
  }

  showSignup = () => {
    let popup = document.getElementById("popup");
    popup.style.display = "block";

    let signin = document.getElementById("signin");
    signin.style.display = "none";
    let signup = document.getElementById("signup");
    signup.style.display = "block";

    let popupheader = document.getElementById("popupHeader");
    popupheader.innerHTML = "Sign Up";
  }

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.classList.remove("show");
      setTimeout(() => {
        popup.style.display = "none";
      }, 300);
    }
  }

  render() {
    return (
      <div className="container">
        <div id='popup' onClick={this.closeSignin}>
          <div id="popupwindow">
            <div id='popupHeader'>login</div>
            <div id='signin'>
              <label className='usernamelable'>User Name</label>
              <input type='text' id="username" />
              <label className='passwordlabel'>Password</label>
              <input type='password' id="signin-password" />
              <div className='forgotpassword'>Forget<label>Password?</label></div>
              <button className='signinbutton' onClick={this.userLogin}>Signin</button>
              <div className="div2">
                Don't have Account? <br />
                <label style={{ color: "green" }} onClick={this.showSignup}>Sign up?</label>
              </div>
            </div>
            <div id="signup">
              <label htmlFor="fullname">Full Name*</label>
              <input type="text" id="fullname" />
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" />
              <label htmlFor="phone">Select Role*</label>
              <select id="role">
                <option value=""></option>
                <option value="1">Admin</option>
                <option value="2">Employer</option>
                <option value="3">Recruiter</option>
              </select>
              <label htmlFor="password">Password*</label>
              <input type="password" id="signup-password" />
              <label htmlFor="confirmpassword">Confirm Password*</label>
              <input type="password" id="confirmpassword" />
              <button className='signupbutton' onClick={this.userRegistration}>Sign Up</button>
              <div>Do you have already account?
                <span onClick={this.showSignin} style={{ color: "green", position: "relative", left: "4px" }} >signin</span>
              </div></div>
          </div>
        </div>
        <header id="header">
          <div className="header-left">
            <img className='logo' src="/logo.png" alt="Logo" />
            <div className="logotext"><span>Job </span> Portal</div>
          </div>
          <div className="signin-section">
            {this.state.isLoggedIn ? (
              <div className="logout" onClick={this.userLogout}>Logout</div>
            ) : (
              <>
                <img className='signinicon' src="/user.png" alt="Sign In Icon" onClick={this.showSignin} />
                <div className="signin" onClick={this.showSignin}>Sign In</div>
              </>
            )}
          </div>
        </header>
        <main id="content">
          <h1 className="text1">INDIA'S NO. #1 JOB PLATFORM</h1>
          <h2 className="text2">Your Job Search Ends Here</h2>
          <h3 className="text3">Discover Career Opportunities</h3>
          <div className="searchbar" style={{ textAlign: 'left' }}>
            <input type="text" placeholder='Search job by "skill"' className='searchtext' />
            <input type="text" placeholder='Job location' className='searchlocation' />
            <button className='searchbutton'>Search</button>
          </div>
        </main>
        <footer id="footer">
          <div className="footertext">Copyright @ 2025. All rights reserved</div>
          <div className="socialmedia">
            <img className="socialmediaicons" src='linkedin.png' alt="LinkedIn" />
            <img className="socialmediaicons" src='facebook.png' alt="Facebook" />
            <img className="socialmediaicons" src='twitter.png' alt="Twitter" />
          </div>
        </footer>
      </div>
    );
  }
}