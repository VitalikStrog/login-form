import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { SocialMedias } from "./SocialMedias";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Form, Input } from "antd";

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
  const { register, formState: { errors }, handleSubmit, control } = useForm<SignupFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignupFormState> = data => { console.log(data); };

  return (
    <Form
      className="formContainer"
      onFinish={handleSubmit(onSubmit)}
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
      <div className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">Full name</span>
        <Controller
          name="fullName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              size="large"
              placeholder="Enter full name"
              status={errors.fullName && 'error'}
            />
          )}
        />
        {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
      </div>
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
      </div>
      <button
        type="submit"
        className="formContainer__button"
      >
        Sign up
      </button>

      <SocialMedias formLink={"/login-form/login"}/>
    </Form>
  );
};
