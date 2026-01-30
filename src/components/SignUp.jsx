import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput"; // Make sure this file exists in the same folder
import Button from "./Button";       // Make sure this file exists in the same folder
import { UserSignUp } from "../api"; 
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Dark overlay + Background Image */
  background: linear-gradient(rgba(11, 10, 10, 0.6), rgba(0, 0, 0, 0.6)), 
              url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070");
  background-size: cover;
  background-position: center;
  position: fixed; /* Ensures it covers the whole screen */
  top: 0;
  left: 0;
`;

const Container = styled.div`
  width: 90%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background: rgba(12, 12, 12, 0.75); /* Darker tint like your screenshot */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 28px;
  border: 1px solid rgba(65, 59, 59, 0.93);
  box-shadow: 0 25px 50px rgba(241, 233, 233, 0.5);
  z-index: 10;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
`;

const Span = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FooterText = styled.div`
  text-align: center;
  font-size: 14px;
  color: white;
  span {
    color: #007bff;
    cursor: pointer;
    font-weight: 600;
    margin-left: 5px;
  }
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!name || !email || !password || loading) {
      alert("Please fill all details");
      return;
    }
    setLoading(true);
    try {
      const res = await UserSignUp({ name, email: email.trim(), password });
      if (res?.data) {
        dispatch(loginSuccess(res.data));
        alert("Success!");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Header>
          <Title>Join FitTrack 👋</Title>
          <Span>Start your fitness journey today</Span>
        </Header>
        
        <Form>
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            handelChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email Address"
            placeholder="Enter your email address"
            value={email}
            handelChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            placeholder="Create a password"
            password
            value={password}
            handelChange={(e) => setPassword(e.target.value)}
          />
          <Button
            text={loading ? "Joining..." : "Sign Up"}
            onClick={handleSignUp}
            isLoading={loading}
            isDisabled={loading}
            full // If your button component supports a full-width prop
          />
        </Form>
        
        <FooterText>
          Already have an account? <span>SignIn</span>
        </FooterText>
      </Container>
    </PageWrapper>
  );
};

export default SignUp;









