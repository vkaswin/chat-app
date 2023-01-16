import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "components";

import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
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
    <div className={styles.reset_container}>
      <div className={styles.title}>
        <b>Reset Password</b>
      </div>
      <div className={styles.note}>
        <p>Enter your Email and instructions will be sent to you!</p>
      </div>
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
      <button className="btn-primary" onClick={handleSubmit(onSubmit)}>
        Reset
      </button>
    </div>
  );
};

export default ResetPassword;
