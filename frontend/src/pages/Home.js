import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import logo from "../assets/images/jigsaw.png";
import { Link, useNavigate } from "react-router-dom";
import wave from "../assets/images/wave.svg";
import { AppContext } from "../context/AppContextProvider";
const Home = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(AppContext)
  return (
    <Box sx={styles.container}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: 600,
          margin: "3rem 0 1rem 0",
          letterSpacing: "1rem",
        }}
        variant="h1"
      >
        Lost Treasure
      </Typography>
      <Typography
        className="subtitle"
        sx={{
          textAlign: "center",
          letterSpacing: "0.3rem",
          lineHeight: "2rem",
          marginBottom: "1rem",
        }}
      >
        Unleash your mind and embark on a puzzle adventure!
      </Typography>
      <img src={logo} style={{ width: "30%", alignSelf: "center" }} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Typography>
          Are you ready?{" "}
          {isAuthenticated ? (
            <Link style={styles.anchorStyle} to="/login">
              launch the app
            </Link>
          ) : (
            <Link style={styles.anchorStyle} to="/login">
              Click here
            </Link>
          )}
        </Typography>
      </Box>
      <img src={wave} style={{ position: "absolute", bottom: 0, zIndex:-1 }} />
    </Box>
  );
};
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    position: 'relative",',
  },
  buttonStyle: {
    margin: "0 1rem",
  },
  anchorStyle: {
    color: "#4398D1",
    fontWeight: "bold",
  },
};
export default Home;
