import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Authentication from "./pages/Authentication"; 
import { useSelector } from "react-redux"; 

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  transition: all 0.2s ease;
`;

const Placeholder = ({ title }) => (
  <div style={{ padding: "40px", textAlign: "center", color: "black" }}>
    <h1>{title} Page</h1>
    <p>This feature is coming soon!</p>
  </div>
);

function App() {
  // Check if user is logged in via Redux state
  const { currentUser } = useSelector((state) => state.user); 

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts />} />
              {/* Fixes the white screen for other nav links */}
              <Route path="/tutorials" exact element={<Placeholder title="Tutorials" />} />
              <Route path="/blogs" exact element={<Placeholder title="Blogs" />} />
              <Route path="/contact" exact element={<Placeholder title="Contact" />} />
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;