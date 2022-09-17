import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CheckBox, Input, PasswordInput } from "components";
import { cookies } from "utils";
import { useAuth, useRouter } from "hooks";
import { NavLink } from "react-router-dom";
import { Toast } from "components";
import { loginUser } from "services/User";
import jwtDecode from "jwt-decode";
import { socket } from "socket";

import styles from "./Login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { setUser } = useAuth();

  const router = useRouter();

  const cookie = cookies();

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.addEventListener("keyup", handleKeyDown);
    let session = cookie.get("login_session") ?? null;
    if (!session) return;
    const { email, password } = JSON.parse(session);
    reset({ email, password });
    setRememberMe(true);
    return () => document.removeEventListener("keyup", handleKeyDown);
  }, []);

  const handleKeyDown = ({ keyCode }) => {
    if (keyCode !== 13) return;

    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      let {
        data: { token },
      } = await loginUser(data);
      const user = jwtDecode(token);
      if (rememberMe) {
        cookie.set({
          name: "login_session",
          value: { email, password },
          days: 14,
        });
      }
      cookie.set({ name: "authToken", value: token, days: 7 });
      socket.init();
      setUser(user);
      router.push("/chats");
    } catch (error) {
      if (error?.message === "User not exist") {
        router.push("/register");
      }
      Toast({ type: "error", message: error?.message });
    }
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
          <NavLink to="/register">
            <span>Register</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
