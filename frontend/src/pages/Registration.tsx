import { useForm } from "react-hook-form";
import "../global css/Registration.scss";

const Registration = () => {
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange"
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data) => {
    console.log("Form state before submission:", formState);
    if (!isValid) {
      return;
    }
    console.log("Form submitted", data);
    reset()
  };

  return (
    <section className="nOpQrS">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign up.</h2>
        <p></p>
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
          <p>{errors.username?.message}</p>
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
          <p>{errors.email?.message}</p>
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
          <p>{errors.password?.message}</p>
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
          <p>{errors.confirmPassword?.message}</p>
        </div>
        <div className="aZpLmN">
          <button type="submit">Sign up</button>
        </div>
      </form>
    </section>
  );
};

export default Registration;
