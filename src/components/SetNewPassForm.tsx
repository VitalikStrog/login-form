import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { Form, Input } from "antd";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

interface SetNewPassFormState {
  password: string;
  confirmPassword: string;
}

const setNewPassSchema = yup.object({
  password: yup.string()
    .matches(/(?=.*[A-Z])(?=.*[0-9])/g, 'The password must contain at least one digit and uppercase letter')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),

}).required();

export const SetNewPassForm: React.FC = () => {
  const { formState: { errors }, handleSubmit, control } = useForm<SetNewPassFormState>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(setNewPassSchema),
  });
  const onSubmit: SubmitHandler<SetNewPassFormState> = data => console.log(data);

  return (
    <Form
      className="formContainer"
      onFinish={handleSubmit(onSubmit)}
    >
      <h2 className="formContainer__title">Set new password</h2>
      <div className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">New password</span>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              size="large"
              placeholder="Set new password"
              status={errors.password && 'error'}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          )}
        />
        {errors.password && <span className="error-message">{errors.password.message}</span>
        }
      </div>
      <div className="formContainer__inputContainer inputContainer">
        <span className="inputContainer__label">Confirm password</span>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input.Password
              {...field}
              type="password"
              size="large"
              placeholder="Confirm password"
              status={errors.confirmPassword && 'error'}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          )}
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
      </div>

      <button
        className="formContainer__button"
        onClick={handleSubmit(onSubmit)}
      >
        Set new password
      </button>
    </Form>
  );
};
