import { useNavigate, Link } from "react-router-dom";
// validations
import * as yup from "yup";
import AuthHeader from "@/components/AuthHeader";
import { useFormik } from "formik";
import FormInput from "@/components/FormInput";
import { useRedux } from "@/hooks";
import { loginUser, resetLoginState } from "@/redux";
import { useEffect } from "react";
import { showErrorNotification, showSuccessNotification } from "@/helpers";
import { Loader, Spinner } from "@/components/Loader";
import { OauthButton } from "@/components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, useStateSelector } = useRedux();

  // get the login state
  const { isLoggedIn, isLoginReqLoading, loginError, message } =
    useStateSelector((state) => state.Login);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please Enter Your Email")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email"
        ),
      password: yup
        .string()
        .required("Please Enter Your Password")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, a number and special character"
        ),
      rememberMe: yup.boolean(),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (message) {
        showSuccessNotification(message);
      }
      dispatch(resetLoginState());
      return navigate("/dashboard");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (loginError) {
      showErrorNotification(loginError);
      dispatch(resetLoginState());
      return;
    }
  }, [loginError]);

  return (
    <div className="w-[95%] max-w-sm sm:w-[80%] md:w-[90%] sm:max-w-lg mx-auto my-6 md:my-0">
      <AuthHeader
        title="Welcome Back"
        subtitle="Welcome back! Please enter your details"
      />
      {isLoginReqLoading && <Loader />}
      <form
        action=""
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
        className="relative"
      >
        <FormInput
          label="Email"
          name="email"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          type="email"
          value={validation.values.email || ""}
          placeholder="Enter your email"
          validation={validation}
        />
        <FormInput
          name="password"
          label="Password"
          onBlur={validation.handleBlur}
          onChange={validation.handleChange}
          type="password"
          value={validation.values.password || ""}
          placeholder="Enter your password"
          validation={validation}
        />
        <div className="mt-5 flex justify-between items-start md:items-center flex-col md:flex-row gap-2 md:gap-0">
          <FormInput
            type="checkbox"
            name="rememberMe"
            value={validation.values.rememberMe}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            label="Remember for 30 days"
            validation={validation}
          />
          <Link
            to={"/forgot-password"}
            className="text-[var(--base-color)] text-sm font-medium self-end md:self-auto"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-5">
          <button
            className="text-center text-sm py-3 px-4 bg-[var(--btn-color)] text-white w-full rounded-md font-medium  flex items-center justify-center hover:opacity-65"
            type="submit"
            style={{ transition: "0.4s ease" }}
          >
            {isLoginReqLoading && <Spinner />}
            Log In
          </button>
        </div>
        <div className="mt-5">
          <OauthButton
            type="google"
            className="hover:bg-[var(--btn-color)] hover:text-white hover:border-[var(--btn-color)]"
            style={{ transition: "0.4s ease" }}
          >
            Sign in with Google
          </OauthButton>
        </div>
        <div className="mt-5">
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-[var(--base-color)] text-sm font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
