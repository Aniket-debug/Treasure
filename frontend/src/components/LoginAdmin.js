import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import "../styles/global.css";
import axios from "axios";
import { AppContext } from "../context/AppContextProvider";
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("This field is required"),
});

function LogAdmin({ heading }) {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };
      axios
        .post("http://127.0.0.1:8000/login/", payload)
        .then((response) => {
          console.log(response);
          if (response?.data?.user?.is_staff) {
            sessionStorage.setItem(
              "admin_token",
              JSON.stringify(response.data.access)
            );
            navigate("/dashboard");
          } else {
            localStorage.setItem("token", JSON.stringify(response.data.access));
            setIsAuthenticated(true);
          }

        })
        .catch((error) => console.log(error));
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/puzzle" />;
  }
  if(heading === "Admin" && sessionStorage.getItem("admin_token")){
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="container">
      <Typography
        sx={{ fontSize: "2rem", fontWeight: 500, textAlign: "center" }}
        variant="h2"
      >
        {heading}
      </Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <SubmitButton />
        {heading === "Login" ? (
          <Typography>
            not a user?{" "}
            <Link style={styles.anchorStyle} to="/register">
              Register
            </Link>
          </Typography>
        ) : null}
      </form>
    </div>
  );
}
const styles = {
  anchorStyle: {
    color: "#4398D1",
    fontWeight: "bold",
  },
  buttonStyle: {
    marginY: "1rem",
  },
};
export default LogAdmin;
