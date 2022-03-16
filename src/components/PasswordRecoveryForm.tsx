import React from "react";
import { Form, Input } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";

interface ForgotPassFormState {
  email: string;
}

const forgotPassSchema = yup.object({
  email: yup.string().required('Email is required'),
}).required();

const codeGenerator = () => {
  return Math.floor(Math.random() * 1000);
};

export const PasswordRecoveryForm = () => {
  const { formState: { errors }, handleSubmit, control } = useForm<ForgotPassFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(forgotPassSchema),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<ForgotPassFormState> = () => {
    navigate(`/forgot-password?code=${codeGenerator()}`);
  };

  return (
    <Form
      className="formContainer"
      onFinish={handleSubmit(onSubmit)}
    >
      <h2 className="formContainer__title">Password recovery</h2>
      <div className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">Email</span>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              size="large"
              placeholder="Enter email"
              status={errors.email && 'error'}
            />
          )}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <button
        className="formContainer__button"
        onClick={handleSubmit(onSubmit)}
      >
        Send code
      </button>
    </Form>
  );
};
