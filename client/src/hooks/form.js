import { useState, useEffect } from "react";

const useForm = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);

  const setName = (value) => {
    setForm((prev) => ({ ...prev, name: value }));
  };

  const setEmail = (value) => {
    setForm((prev) => ({ ...prev, email: value }));
  };
  const setPassword = (value) => {
    setForm((prev) => ({ ...prev, password: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const isSignUpFormValid =
    form.name !== "" && form.email !== "" && form.password !== "";

  const isSignInFormValid = form.email !== "" && form.password !== "";

  const isAccountFormValid = form.name !== "" || form.email !== "";

  // Clear error message upon deletion of any form fields
  useEffect(() => {
    if (!isSignUpFormValid || !isSignInFormValid || isAccountFormValid) {
      setErrorMessage(null);
    }
  }, [isSignUpFormValid, isSignInFormValid, isAccountFormValid]);

  return {
    initialState,
    form,
    setForm,
    setName,
    setEmail,
    setPassword,
    handleChange,
    isSignUpFormValid,
    isSignInFormValid,
    isAccountFormValid,
    errorMessage,
    setErrorMessage,
  };
};

export default useForm;
