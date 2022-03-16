import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { SocialMedias } from "./SocialMedias";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";

interface LoginFormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

const schema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .matches(/(?=.*[A-Z])(?=.*[0-9])/g, 'The password must contain at least one digit and uppercase letter'),
  rememberMe: yup.boolean(),
}).required();

export const LoginForm: React.FC = (): JSX.Element => {
  const { register, formState: { errors }, handleSubmit, control } = useForm<LoginFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<LoginFormState> = data => { console.log(data); };

  return (
    <Form
      className="formContainer formContainer__recovery"
      onFinish={handleSubmit(onSubmit)}
    >
      <h2 className="formContainer__title">Log in</h2>
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

      <div className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">Password</span>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              size="large"
              placeholder="Enter password"
              status={errors.password && 'error'}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          )}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
        <span className="inputContainer__label">
          <Link to="/forgot-password">Forgot password?</Link>
        </span>
      </div>

      <div className="checkBoxContainer">
        <input
          type="checkbox"
          className="loginCheckbox"
          id="rememberMe"
          {...register("rememberMe")}

        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>

      <button
        type="submit"
        className="formContainer__button"
      >
        Log in
      </button>

      <SocialMedias formLink={"/sign-up"} />
    </Form>
  );
};
