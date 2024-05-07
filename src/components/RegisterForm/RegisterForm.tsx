import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import AuthService from "../../services/auth.service";
import { RegisterUserData } from "../../types/userType";
// import { RegisterSuccessMessage } from "../RegisterSuccessMessage/RegisterSuccessMessage";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterForm: React.FC = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState(false);

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, "Username is too short")
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required!")
      .min(
        8,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "Password must contain at least 1 lower case letter")
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match!")
      .required("Password is required!"),
  });

  const initialValues: RegisterUserData = {
    username: "",
    password: "",
    passwordConfirm: "",
  };

  const onSubmit = async (
    values: RegisterUserData,
    submittingObject: FormikHelpers<RegisterUserData>
  ) => {
    await AuthService.register({
      username: values.username,
      password: values.password,
    })
      .then(() => {
        setSuccess(true);
      })
      .catch((error: AxiosError) => {
        if (error.status === 403) {
          setRegisterError("account already exists!");
        }
      });
    submittingObject.resetForm();
  };

  if (success) {
    // return <RegisterSuccessMessage />;
    alert("registered..you can now login");
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form style={{ textAlign: "center" }}>
          <h1 style={{ color: "#262626" }}>Register</h1>
          {registerError ? <p className="errors">{registerError}</p> : null}
          {/* <ThemeProvider theme={theme}> */}
          <div className="field-group">
            <span className="reg-form-field">
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.username}
                sx={{
                  marginBottom: 2,
                }}
              />
              <ErrorMessage name="username" component="p" className="errors" />
            </span>
          </div>
          <div className="field-group">
            <span className="reg-form-field">
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.password}
                sx={{
                  marginBottom: 2,
                }}
              />
              <ErrorMessage name="password" component="p" className="errors" />
            </span>
            <span className="reg-form-field">
              <TextField
                fullWidth
                id="passwordConfirm"
                label="Password confirmation"
                type="password"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                sx={{
                  marginBottom: 2,
                }}
              />
              <ErrorMessage
                name="passwordConfirm"
                component="p"
                className="errors"
              />
            </span>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!formik.isValid || formik.isSubmitting}
            disableElevation
          >
            Register
          </Button>
          {/* </ThemeProvider> */}
        </Form>
      )}
    </Formik>
  );
};
