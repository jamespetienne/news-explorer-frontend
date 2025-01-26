import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../Hooks/useForm.js";
import { useState } from "react";

const RegisterModal = ({
  isOpen,
  closeActiveModal,
  onRegister,
  handleLoginModal,
  checkEmailAvailability,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = values;

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    handleChange(e);
    setIsEmailValid(isValidEmail(value));
    setIsEmailAvailable(true);
  };

  const isFormComplete =
    isValidEmail(email) && password.trim().length > 0 && name.trim().length > 0;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isFormComplete) {
  //     const available = await checkEmailAvailability(email);
  //     if (available) {
  //       onRegister(values);
  //       closeActiveModal();
  //     } else {
  //       setIsEmailAvailable(false);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormComplete) {
      try {
        await signUp(name, email, password);
        onRegister(values);
        closeActiveModal();
      } catch (error) {
        setIsEmailAvailable(false); // Display the error if email exists
      }
    }
  };
  

  return (
    <ModalWithForm
  closeActiveModal={closeActiveModal}
  name="signup"
  title="Sign Up"
  buttonText="Sign Up"
  isOpen={isOpen}
  onSubmit={handleSubmit}
  spanText="Log In"
  orModal={handleLoginModal}
  isButtonActive={isFormComplete}
>
  <label className="modal__label" htmlFor="register-email">
    Email
  </label>
  <input
    className="modal__input"
    type="email"
    name="email"
    id="register-email"
    placeholder="Email"
    value={email}
    onChange={handleEmailChange}
    required
    autoComplete="username"
  />
  <label className="modal__label" htmlFor="register-password">
    Password
  </label>
  <input
    className="modal__input"
    type="password"
    name="password"
    id="register-password"
    placeholder="Password"
    value={password}
    onChange={handleChange}
    required
    autoComplete="new-password"
  />
  <label className="modal__label" htmlFor="register-name">
    Username
  </label>
  <input
    className="modal__input"
    type="text"
    name="name"
    id="register-name"
    placeholder="Username"
    value={name}
    onChange={handleChange}
    required
  />
  {!isEmailAvailable && (
    <span className="modal__error modal__error--email">
      This email is not available
    </span>
  )}
</ModalWithForm>

  );
};

export default RegisterModal;



