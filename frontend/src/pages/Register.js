import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import "../styles/global.css";
import { AppContext } from "../context/AppContextProvider";
const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("This field is required"),
  firstName: yup
    .string("Enter your first name")
    .required("This field is required"),
  lastName: yup
    .string("Enter your Last name")
    .required("This field is required"),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
});
const RegistrationForm = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
      };
      axios
        .post("http://127.0.0.1:8000/signup/", payload)
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data.access));
          setIsAuthenticated(true);
        })
        .catch((error) => console.log(error));
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/puzzle" />;
  }
  return (
    <div className="container">
      <Typography
        sx={{ fontSize: "2rem", fontWeight: 500, textAlign: "center" }}
        variant="h2"
      >
        Register
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
          label="First Name"
          type="text"
          fullWidth
          margin="normal"
          id="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          label="Last Name"
          type="text"
          fullWidth
          margin="normal"
          id="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <TextField
          label="Email"
          type="email"
          id="email"
          value={formik.values.email}
          fullWidth
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          fullWidth
          margin="normal"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <SubmitButton />
      </form>
      <Typography sx={{ textAlign: "center" }}>
        already a user?, try{" "}
        <Link style={styles.anchorStyle} to="/login">
          login
        </Link>{" "}
        instead
      </Typography>
    </div>
  );
};
const styles = {
  anchorStyle: {
    color: "#4398D1",
    fontWeight: "bold",
  },
};
export default RegistrationForm;
