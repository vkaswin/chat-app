import React from "react";
import { useForm } from "react-hook-form";
import { Input, PasswordInput } from "components";

import styles from "./Register.module.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className={styles.register_title}>
        <b>Register Account</b>
        <span>Get your free account now.</span>
      </div>
      <div className={styles.register_field}>
        <Input
          label="Username"
          placeholder="Enter username"
          register={register("userName", {
            required: true,
            pattern: /^[A-Za-z ]+$/,
            minLength: 3,
          })}
          error={errors?.userName}
          message={{
            required: "Please enter username",
            minLength: "Username contain atleast 3 characters",
            pattern: "Username should contain only alphabets and spaces",
          }}
        />
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
          register={register("password", { required: true })}
          error={errors.password}
          message={{ required: "Please enter password" }}
        />
        <button className="btn-primary" onClick={handleSubmit(onSubmit)}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
