import React from "react";
import { useLocation } from "react-router-dom";
import { SetNewPassForm } from "./SetNewPassForm";
import { PasswordRecoveryForm } from "./PasswordRecoveryForm";

export const ForgotPassForm: React.FC = () => {
  const code = new URLSearchParams(useLocation().search).get('code');

  return code ? <SetNewPassForm /> : <PasswordRecoveryForm />;
};
