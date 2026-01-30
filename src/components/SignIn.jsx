import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignIn } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateInputs() || loading) return;
    setLoading(true);

    try {
      // Trim email to prevent accidental space errors
      const res = await UserSignIn({ email: email.trim(), password });
      
      if (res && res.data) {
        dispatch(loginSuccess(res.data));
        alert("Login Successful!");
      }
    } catch (err) {
      // This will display "User not found" if the email doesn't exist
      const errorMessage = err.response?.data?.message || "An unknown error occurred";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <Title>Welcome Back 👋</Title>
        <Span>Please enter your details to login</Span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
          value={email}
          handelChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          password
          value={password}
          handelChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text={loading ? "Logging in..." : "Sign In"}
          onClick={handleSignIn}
          isLoading={loading}
          isDisabled={loading}
        />
      </div>
    </Container>
  );
};

export default SignIn;










