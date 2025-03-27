import React, { Component } from 'react'
import './App.css'
import { callApi, setSession} from './api';

export default class App extends Component {
  
constructor(){
  super();
  this.userRegistration=this.userRegistration.bind(this);
  this.signin=this.signin.bind(this);
}

  showsignin(){
    let popup=document.getElementById("popup");
    let signin=document.getElementById("signin");
    let signup=document.getElementById("signup");
    let popupheader=document.getElementById("popupheader");
    popupheader.innerHTML="Login";
    signup.style.display="none";
    signin.style.display="block";
    popup.style.display="block";
  }
  showsignup(){
    let popup=document.getElementById("popup");
    let signin=document.getElementById("signin");
    let signup=document.getElementById("signup");
    let popupheader=document.getElementById("popupheader");
    popupheader.innerHTML="create new account";
    signup.style.display="block";
    signin.style.display="none";
    popup.style.display="block";

    let fullname=document.getElementById("fullname");
    let email=document.getElementById("email");
    let role=document.getElementById("role");
    let signuppassword=document.getElementById("signuppassword");
    let confirmpassword=document.getElementById("confirmpassword");

    fullname.value="";
    email.value="";
    role.value="";
    signuppassword.value="";
    confirmpassword.vale="";

  }

  closesignin(event){
    if(event.target.id=="popup"){
    let popup=document.getElementById("popup");
    popup.style.display="none";
  }
  }

  userRegistration(){
    let fullname=document.getElementById("fullname");
    let email=document.getElementById("email");
    let role=document.getElementById("role");
    let signuppassword=document.getElementById("signuppassword");
    let confirmpassword=document.getElementById("confirmpassword");
    
    fullname.style.border="";
    email.style.border="";
    role.style.border="";
    signuppassword.style.border="";
    confirmpassword.style.border="";

    if(fullname.value==""){
      fullname.style.border="1px solid red";
      fullname.focus();
      return;
    }

    if(email.value==""){
      email.style.border="1px solid red";
      email.focus();
      return;
    }

    if(role.value==""){
      role.style.border="1px solid red";
      role.focus();
      return;
    }

    if(signuppassword.value==""){
      signuppassword.style.border="1px solid red";
      signuppassword.focus();
      return;
    }

    if(confirmpassword.value==""){
      confirmpassword.style.border="1px solid red";
      confirmpassword.focus();
      return;
    }
  
   if(signuppassword.value != confirmpassword.value){
    signuppassword.style.border="1px solid red";
      signuppassword.focus();
      return;
   }

    var data=JSON.stringify({
      fullname:fullname.value,
      email:email.value,
      password:signuppassword.value,
      role:role.value
    });

    callApi("POST","http://localhost:9090/users/signup",data,this.getResponse)
  }
 
  getResponse(res){
    let resp=res.split('::');
    alert(resp[1]);
    if(resp[0] ==="200"){
      let signin=document.getElementById("signin");
      let signup=document.getElementById("signup");
      signup.style.display="none";
      signin.style.display="block"
    }
  }
  
  
  signin(){
  
    username.style.border="";
    password.style.border="";
    responseDiv.innerHTML="";

 
     if(username.value===""){
      username.style.border="1px solid red";
      username.focus();
      return;
     }   
     if(password.value===""){
      password.style.border="1px solid red";
      password.focus();
      return;
     }


     let data=JSON.stringify({
      email:username.value,
      password:password.value
     });





     callApi("POST", "http://localhost:9090/users/signin", data, this.signinResponse);
     
  }

  signinResponse(res){
    let rdata = res.split('::');
    if(rdata[0] === "200"){
      setSession("csrid",rdata[1],1);
      window.location.replace("/dashboard");
    }
    else{
      // responseDiv.innerHTML = `<br/><label style='color:red'>${rdata[1]}</label>`;
      alert(rdata[1]);
    }
  }
  


  render() {
    return (
      <div className='container'>
        <div id="popup" onClick={this.closesignin}>
          <div className='popupwindow'>
            <div id='popupheader'>Login</div>
            <div id='signin'>
              <label className='usernamelabel'>User Name</label>
              <input type='text' id="username"/>
              <label className='passwordlabel'>Password*</label>
              <input type='password' id="password"/>
              <div className='forgetpassword'>Forget<label>Passowrd?</label></div>
              <button className='signinbutton' onClick={this.signin}>Signin</button>
              <div className='div1' id="responseDiv"></div>
              <div className='div2'>
                Dont have an account?
                <label onClick={this.showsignup}>Sign Up Now</label>
              </div>
            </div>
            <div id="signup">
              <label>Full Name*</label>
              <input type='text' id="fullname"/>
              <label>Email</label>
              <input type='email' id='email'/>
              <label>Select a Role</label>
              <select id="role">
                <option value="1">Admin</option>
                <option value="2">Employer</option>
                <option value="3">Job Seeker</option>
              </select>
              <label>Password</label>
              <input type='password' id="signuppassword"/>
              <label>Confirm Password</label>
              <input type='password' id="confirmpassword"/>
              <button className='registerbutton'onClick={this.userRegistration}>Register</button>
              <div>Already have an account <span onClick={this.showsignin}>signin</span></div>
            </div>
          </div>
        </div>
        <div id="header">
          <img className='logo' src='/logo.png'/>
          <div className='logoText'><span>Job</span> Portal</div>
          <img className='signinicon' src='/user.png' onClick={this.showsignin}/>
          <div className='signintext' onClick={this.showsignin}>SignIn</div>
        </div>
        <div id="content">
          <div className='text1'>Indians No.1 Job Platform</div>
          <div className='text2'>Your Job Search Ends Here</div>
          <div className='text3'>Discover Career Opportunities</div>
          <div className='searchbar'>
            <input type='text' className='searchtext' placeholder='search by skill'/>
            <input type='text' className='searchlocation'placeholder='job location'/>
            <button className='searchbutton'>Search Jobs</button>
          </div>

        </div>
        <div id="footer">
          <label className='copyrightText'>Copyright @2025 All rights reserved</label>
          <img className='socialmediaicons' src='/facebook.png'/>
          <img className='socialmediaicons' src='/linkedin.png'/>
          <img className='socialmediaicons' src='/twitter.png'/>

        </div>

      </div>
    )
  }
}