import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import "../global css/Registration.scss";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  //react hook from///
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange"
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data) => {
    // console.log("Form state before submission:", formState);
    if (!isValid) {
      return;
    }
    // console.log("Form submitted", data);


    registerUserMutation.mutate(data)
  };

  //react hook from///


  ///use mutation part testing

  const registerUserMutation = useMutation({
    mutationFn: async (userData) => {
      try {
        const res = await axios.post("http://localhost:8080/api/v1/auth/register", userData)
        // console.log(res)
        return res.data
      } catch (error) {
        throw error
      }
    },
    onSuccess: () => {
      // console.log("Registration successful");
      //data, variables, context can use these parameters
      // console.log("Returned data:", data);
      // console.log("Variables passed to mutation:", variables);

      //email: johndoe@example.com, password: securePassword12;
      //email: nileshshr97@gmail.com, password: siberiaV2
      //email: admin@admin.com, password:securepassword
      toast.success("Sign Up Successful. Please verify email!", {
        position: "top-right",
        style: {
          height: "25px", // Adjust this value to your desired height
          fontSize: "13px",
          margin: 0,
        },
      });

      setTimeout(() => {
        // console.log("Sign Up Successful. Redirecting to /login...");
        // Use navigate to navigate to /login
        // window.location = "/login";
        navigate("/sign-in");
      }, 3000);
      reset()
    },
    onError: (error) => {
      error?.response?.data?.message ? setErrorMessage(error?.response.data.message) : setErrorMessage(error.message)
    },
    onSettled: () => {
      // Set up a timer to clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    },

    //this part dones not need to be used unless needed


    // onMutate: (variables) => {
    //   // This is called before the mutation function
    //   console.log("Mutation about to start");
    //   console.log("Variables passed to mutation:", variables);

    //   // You can return an object to be used in the context parameter of onSuccess and onError
    //   return { snapshot: "previousState" };
    // },


    //this part dones not need to be used unless needed
  })






  ///use mutation part testing

  return (
    <section className="nOpQrS py-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign up.</h2>
        <p className="errMsg">{errorMessage}</p>
        <div className="aZpLmN">
          <label htmlFor="username">USERNAME*</label>
          <input
            type="text"
            id="username"
            {...register("username",
              {
                required: "username is required",
                pattern: {
                  value: USER_REGEX,
                  message: "4-24 characters, starts with a letter, allows letters, numbers, underscores, hyphens.",
                },
              })}
            autoComplete="off"
          />
          <p className="input-errors">{errors.username?.message}</p>
        </div>
        <div className="aZpLmN">
          <label htmlFor="email">EMAIL*</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "valid email format required.",
              },
            })}
            autoComplete="off"
          />
          <p className="input-errors">{errors.email?.message}</p>
        </div>
        <div className="aZpLmN">
          <label htmlFor="password">PASSWORD*</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "password is required",
              pattern: {
                value: PWD_REGEX,
                message: "8-24 characters, at least one lowercase letter, one uppercase letter, and one digit required.",
              },
            })}
            autoComplete="off"
          />
          <p className="input-errors">{errors.password?.message}</p>
        </div>
        <div className="aZpLmN">
          <label htmlFor="confirm-password">CONFIRM PASSWORD*</label>
          <input
            type="password"
            id="confirm-password"
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) =>
                value === form.watch("password") ||
                "Passwords do not match",
            })}
            autoComplete="off"
          />
          <p className="input-errors">{errors.confirmPassword?.message}</p>
        </div>
        <div className="aZpLmN">
          <button type="submit">Sign up</button>
        </div>
        <div className="register">
          Already have an account? <span><Link to="/sign-in">sign in.</Link></span>
        </div>
        <div className="register text-center">
          Note: use gmail account to login, register or account recovery
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Registration;
