import React from "react";
import { useForm } from "react-hook-form";
import { Input, PasswordInput, Toast } from "components";
import { registerUser } from "services/User";
import { useRouter } from "hooks";

import styles from "./Register.module.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      let {
        data: { message },
      } = await registerUser(data);
      Toast({ type: "success", message });
      router.push("/auth/login");
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
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
          register={register("name", {
            required: true,
            pattern: /^[A-Za-z ]+$/,
            minLength: 3,
          })}
          error={errors?.name}
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
