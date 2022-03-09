import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

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

export const LoginForm: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<LoginFormState> = data => { console.log(data); };


  return (
    <form
      className="loginForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="loginForm__inputContainer inputContainer">
        <span className="inputContainer__label">Email</span>
        <input
          className={classNames(
            'inputContainer__input',
            {'inputContainer__input_error': !!errors.email },
          )}
          type="email"
          placeholder="Enter email"
          {...register("email")}
        />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </label>

      <label className="loginForm__inputContainer inputContainer">
        <span className="inputContainer__label">Password</span>
        <div className="passwordContainer">
          <input
            className={classNames(
              'inputContainer__input',
              'passwordContainer__field',
              {'inputContainer__input_error': !!errors.password },
            )}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter password"
            {...register("password")}
          />
          <FontAwesomeIcon
            icon={isPasswordVisible ? faEyeSlash : faEye}
            onClick={() => setPasswordVisible(prevState => !prevState)}
            className="passwordContainer__icon"
          />
        </div>
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </label>

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
        className="loginForm__button"
      >
        Log in
      </button>
    </form>
  );
};
