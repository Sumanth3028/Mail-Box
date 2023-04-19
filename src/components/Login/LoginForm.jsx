import React, { Fragment, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authactions } from "../../store/AuthSlice";
const LoginForm = () => {
    const dispatch = useDispatch();
  const [successful,setIsSuccessful]=useState(false)
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;
   try{
    let res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-Ed8ahcg8baXPHndhsUaiXy2lR0tY0AM",
      
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
        
    );
   
      setIsSuccessful(true)
      
      dispatch(Authactions.login({token:res.data.idToken,email:res.data.email}))
     
      setTimeout(()=>{
          navigate('/empty')
      },2000)
     

    
    } catch(error) {

       setIsSuccessful(false)
      
      alert(error.message);
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
            height: "29rem",
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
              Login
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
                  marginBottom: "2rem",
                }}
                ref={passRef}
              ></FormControl>
            </FormGroup>
            {successful && <p style={{textAlign:'center',fontSize:'1rem'}}> Login Successful</p>}
            <Button
              type="submit"
              style={{
                marginLeft: "22rem",
                padding: "1rem",
                width: "25%",
                marginBottom: "1rem",
              }}
            >
              Login
            </Button>
          </Form>
        </Card>
      </Fragment>
    </div>
  );
};

export default LoginForm;
