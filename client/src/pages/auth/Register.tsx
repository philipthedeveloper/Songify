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

const Register = () => {
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
      firstName: "",
      lastName: "",
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
      firstName: yup
        .string()
        .required("Please Enter First Name")
        .min(2, "First Name must be at least 2 characters")
        .matches(/^[a-zA-Z]+$/, "Name cannot contain special character"),
      lastName: yup
        .string()
        .required("Please Enter Last Name")
        .min(2, "Last Name must be at least 2 characters")
        .matches(/^[a-zA-Z]+$/, "Name cannot contain special character"),
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
    <div className="w-[95%] max-w-sm sm:w-[85%] md:w-[90%] sm:max-w-lg mx-auto my-6 md:my-0">
      <AuthHeader
        title="Create Account"
        subtitle="Your fav music awaits. Setup your account now!"
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
        <div className="grid grid-col-1 sm:grid-cols-2 gap-0 sm:gap-2">
          <FormInput
            label="First Name"
            name="firstName"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            type="text"
            value={validation.values.firstName || ""}
            placeholder="Enter First Name"
            validation={validation}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            type="text"
            value={validation.values.lastName || ""}
            placeholder="Enter Last Name"
            validation={validation}
          />
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 gap-0 sm:gap-2">
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
        </div>

        <div className="mt-5">
          <button
            className="text-center text-sm py-3 px-4 bg-[var(--btn-color)] text-white w-full rounded-md font-medium  flex items-center justify-center hover:opacity-65"
            type="submit"
            style={{ transition: "0.4s ease" }}
          >
            {isLoginReqLoading && <Spinner />}
            Create account
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
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-[var(--base-color)] text-sm font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
