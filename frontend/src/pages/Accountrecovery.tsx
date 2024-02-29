import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useLogout } from '../context/useLogout';

const Accountrecovery = () => {

    const [searchParams] = useSearchParams();
    const email = searchParams.get("token")
    const [errorMessage, setErrorMessage] = useState(null);
    const { logout } = useLogout()

    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;


    //react hook from///
    const form = useForm({
        defaultValues: {
            email: email,
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
            // console.log(userData)
            try {
                const res = await axios.patch("http://localhost:8080/api/v1/auth/update-password", userData)
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
            toast.success("Password has been reset, please login.", {
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
                logout()
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


    })






    ///use mutation part testing

    return (
        <section className="nOpQrS py-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Reset Password.</h2>
                <p className="errMsg">{errorMessage}</p>

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
                    <button type="submit">Reset Password</button>
                </div>
                <div className="register text-center">
                    Note: use gmail account to login, register or account recovery
                </div>
            </form>
            <ToastContainer />
        </section>
    );
};

export default Accountrecovery