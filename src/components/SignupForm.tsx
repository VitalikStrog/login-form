import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import classNames from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {SocialMedias} from "./SocialMedias";

interface SignupFormState {
  profileType: string;
  fullName: string;
  email: string;
  password: string;
}

const schema = yup.object({
  profileType: yup.string().required('Select profile type'),
  fullName: yup.string().required('Full name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .matches(/(?=.*[A-Z])(?=.*[0-9])/g, 'The password must contain at least one digit and uppercase letter'),
}).required();

export const SignupForm: React.FC = () => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const { register, formState: { errors }, handleSubmit } = useForm<SignupFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignupFormState> = data => { console.log(data); };

  return (
    <form
      className="formContainer"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="formContainer__title">Sign up</h1>
      <div className="formContainer__profile-type profile-type">
        <label className="profile-type__container">
          <input
            type="radio"
            value="individual"
            checked
            className="profile-type__radio"
            {...register("profileType")}
          />
          <span>Individual</span>
        </label>
        <label className="profile-type__container">
          <input
            type="radio"
            value="tour-company"
            className="profile-type__radio"
            {...register("profileType")}
          />
          <span>Tour company</span>
        </label>
      </div>
      <label className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">Full name</span>
        <input
          className={classNames(
            'inputContainer__input',
            {'inputContainer__input_error': !!errors.fullName },
          )}
          type="text"
          placeholder="Enter full name"
          {...register("fullName")}
        />
        {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
      </label>
      <label className="formContainer__inputContainer inputContainer">
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
      <label className="formContainer__inputContainer inputContainer">
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
      <button
        type="submit"
        className="formContainer__button"
      >
        Sign up
      </button>

      <SocialMedias formLink={"/login-form/login"}/>
    </form>
  );
};
