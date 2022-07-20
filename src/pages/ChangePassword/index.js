import React from "react";
import { useForm } from "react-hook-form";
import { Avatar, PasswordInput } from "components";

import styles from "./ChangePassword.module.scss";
import { useRouter } from "hooks";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = (data) => {
    console.log(data);
  };

  const onCancel = () => {
    router.goBack();
  };

  return (
    <div className={styles.change_password_container}>
      <div className={styles.title}>
        <b>Change Password</b>
      </div>
      <div className={styles.profile}>
        <Avatar
          src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-1.jpg"
          size={90}
        />
        <span>Kathryn Swarey</span>
      </div>
      <div className={styles.form_field}>
        <PasswordInput
          label="Old Password"
          register={register("oldPassword", { required: true })}
          error={errors.oldPassword}
          message={{ required: "Please enter old password" }}
        />
        <PasswordInput
          label="New Password"
          placeholder="Enter New Password"
          register={register("newPassword", { required: true })}
          error={errors.newPassword}
          message={{ required: "Please enter new password" }}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          register={register("confirmPassword", { required: true })}
          error={errors.confirmPassword}
          message={{ required: "Please enter confirm password" }}
        />
        <div className={styles.btn}>
          <button onClick={handleSubmit(onSubmit)} data-ripple>
            Save
          </button>
          <button onClick={onCancel} data-ripple>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
