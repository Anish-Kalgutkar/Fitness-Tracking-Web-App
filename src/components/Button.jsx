import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const StyledButton = styled.div`
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 16px;
  /* Make sure background isn't white! */
  background: ${({ theme }) => theme.primary}; 
  
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const Button = ({ text, isLoading, isDisabled, onClick }) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick()}
      style={{ opacity: isDisabled ? 0.5 : 1 }}
    >
      {isLoading ? (
        <CircularProgress size={18} color="inherit" />
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default Button;