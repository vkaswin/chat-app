import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckBox, Input, PasswordInput } from "components";
import { getCookie, setCookie } from "utils";
import { useRouter } from "hooks";

import styles from "./Login.module.scss";
import { NavLink } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const { email = null, password = null } = getCookie("login-cache") ?? {};
    if (!email || !password) return;
    reset({ email, password });
    setRememberMe(true);
  }, []);

  const onSubmit = ({ email, password }) => {
    if (rememberMe) {
      setCookie({ name: "login-cache", value: { email, password }, days: 14 });
    }
    router.push("/chats");
  };

  const handleCheckBox = ({ target: { checked } }) => {
    setRememberMe(checked);
  };

  return (
    <div>
      <div className={styles.login_title}>
        <b>Welcome Back! 👋</b>
        <span>Sign in to continue</span>
      </div>
      <div className={styles.login_field}>
        <Input
          label="Email"
          placeholder="Enter email"
          register={register("email", {
            required: true,
            pattern:
              /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          })}
          error={errors?.email}
          message={{
            required: "Please enter email id",
            pattern: "Invalid email id",
          }}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter Password"
          register={register("password", { required: true })}
          error={errors.password}
          message={{ required: "Please enter password" }}
        />
        <CheckBox
          label="Remeber Me"
          name="rememberMe"
          onChange={handleCheckBox}
          checked={rememberMe}
        />
        <button className="btn-primary" onClick={handleSubmit(onSubmit)}>
          Log In
        </button>
        <div className={styles.register}>
          <span>Dont't have an account ?</span>
          <NavLink to="/auth/register">
            <span>Register</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
