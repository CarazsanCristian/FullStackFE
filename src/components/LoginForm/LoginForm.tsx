import { Button, TextField } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { User } from "../../types/userType";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import AuthService from "../../services/auth.service";
import { AxiosError } from "axios";
import StorageService from "../../services/storage.service";
import YupPassword from "yup-password";
YupPassword(Yup);

export const LoginForm: React.FC = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username is too short")
      .required("Username is required!"),
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
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (
    values: User,
    submittingObject: FormikHelpers<any>
  ) => {
    await AuthService.login({
      username: values.username,
      password: values.password,
    })
      .then((resp: { data: { accessToken: any } }) => {
        if (resp.data && resp.data.accessToken) {
          StorageService.setToken(resp.data.accessToken);
        }
        navigate("/");
        window.location.reload();
      })
      .catch((err: { response: { status: number } }) => {
        if (err instanceof AxiosError && err.response?.status) {
          switch (err.response.status) {
            case 404:
              setLoginError("Username or password incorrect.");
              break;
            default:
              setLoginError("Something went wrong. Please try again later.");
              break;
          }
        } else {
          setLoginError("Something went wrong. Please try again later.");
        }
      });
    submittingObject.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        color="secondary"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{
          marginBottom: 2,
        }}
      />
      <TextField
        fullWidth
        id="password"
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{
          marginBottom: 2,
        }}
      />
      <div className="login-button-group">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.isValid || formik.isSubmitting}
          disableElevation
          sx={{
            marginRight: 2,
          }}
        >
          Login
        </Button>
        <Button
          variant="outlined"
          color="primary"
          href="/register"
          disableElevation
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};
