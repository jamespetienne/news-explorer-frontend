import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";
import { useState } from "react";
import { signIn } from "../../utils/auth";

const LoginModal = ({
  isOpen,
  closeActiveModal,
  handleRegisterModal,
  onSignIn,
}) => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { email, password } = values;

  const [isEmailValid, setIsEmailValid] = useState(true);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleChange(e);
    setIsEmailValid(isValidEmail(value));
  };

  const isFormComplete = isValidEmail(email) && password.trim().length > 0;

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (isFormComplete) onSignIn(values);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete) {
      try {
        const response = await signIn(email, password);
        onSignIn(response.token); // Update state or context with token
        closeActiveModal();
      } catch (error) {
        console.error("Login failed", error.message);
      }
    }
  };
  

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      name="login"
      title="Sign in"
      buttonText="Sign in"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      spanText="Sign Up"
      orModal={handleRegisterModal}
      isButtonActive={isFormComplete}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
      </label>
      <input
        className="modal__input"
        type="text"
        name="email"
        id="login-email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        autoComplete="username"
      />
      {!isEmailValid && (
        <span className="modal__error">Invalid email address</span>
      )}
      <label className="modal__label" htmlFor="login-password">
        Password
      </label>
      <input
        className="modal__input"
        type="password"
        name="password"
        id="login-password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
};

export default LoginModal;


