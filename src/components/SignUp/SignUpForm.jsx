import React, { Fragment, useRef, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import today from "../../assets/today.jpg";

const SignUpForm = () => {
   const [successful,setIsSuccessful]=useState(false)
   const[error,setError]= useState(false)
   const navigate=useNavigate()
  const emailRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const email=emailRef.current.value
    const password=passRef.current.value
    const confirm=confirmRef.current.value
     if(password!==confirm){
        setError(true)
     }
     
     else{
        setError(false)
    let res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD-Ed8ahcg8baXPHndhsUaiXy2lR0tY0AM",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password:password ,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data
    if(res.ok){
        console.log('successful')
        setIsSuccessful(true)
        setTimeout(()=>{
            navigate('/login')
        },1000)
        return res.json()
    }
    else{
        setIsSuccessful(false)
        data=await res.json()
        alert(data.error.message)
        
    }
}
  };

  return (
    <div style={{ background: "grey", height: "57rem", paddingTop: "1rem" }}>
      <Fragment>
        <Card
          style={{
            width: "60rem",
            margin: "10rem",
            marginLeft: "28rem",
            height: "35rem",
            background: "pink",
            borderRadius: "5rem",
          }}
        >
          <Form onSubmit={formSubmitHandler}>
            <header
              style={{
                fontSize: "3rem",
                textAlign: "center",
                marginBottom: "2rem",
                fontFamily: "bold",
              }}
            >
              Sign Up{" "}
            </header>
            <FormGroup>
              <FormLabel style={{ fontSize: "1.5rem", marginLeft: "12rem" }}>
                Email:
              </FormLabel>
              <FormControl
                type="email"
                placeholder="enter your email"
                required
                style={{
                  width: "60%",
                  marginLeft: "11rem",
                  textAlign: "center",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                }}
                ref={emailRef}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel style={{ fontSize: "1.5rem", marginLeft: "12rem" }}>
                Password:
              </FormLabel>
              <FormControl
                type="password"
                placeholder="enter your Password"
                required
                style={{
                  width: "60%",
                  marginLeft: "11rem",
                  textAlign: "center",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                }}
                ref={passRef}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormLabel style={{ fontSize: "1.5rem", marginLeft: "12rem" }}>
                Confirm Password:
              </FormLabel>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                required
                style={{
                  width: "60%",
                  marginLeft: "11rem",
                  textAlign: "center",
                  padding: "0.5rem",
                  marginBottom: "2rem",
                }}
                ref={confirmRef}
              ></FormControl>
            </FormGroup>
            {successful && <p style={{textAlign:'center',fontSize:'1rem'}}>Account Created Successfully</p>}
            {error && <p style={{textAlign:'center',color:'red',fontSize:'1rem'}}>Password and Confirm password didn't match</p>}
            <Button type="submit"
              style={{ marginLeft: "22rem", padding: "1rem", width: "25%" ,marginBottom:'1rem'}}
            >
              Submit
            </Button>
          </Form>
          <p style={{textAlign:'center',fontSize:'1.2rem'}}>Already Have an Account? <a href='/login'>Login</a></p>
        </Card>
      </Fragment>
    </div>
  );
};

export default SignUpForm;
