import React, { useEffect } from "react";
import "./ModalWithForm.css";
import close from "../../assets/close-modal.svg";

function ModalWithForm({
  title,
  children,
  buttonText,
  isOpen,
  closeActiveModal,
  orModal,
  onSubmit,
  spanText,
  isButtonActive,
}) {
  // Close modal when clicking outside its borders
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeActiveModal]);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeActiveModal]);

  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <form className="modal__form" onSubmit={onSubmit}>
          <button
            className="modal__close"
            type="button"
            onClick={closeActiveModal}
          >
            <img src={close} alt="close-button" />
          </button>
          <h2 className="modal__title">{title}</h2>
          {children}
          <div className="modal__login-wrapper">
            <button
              className={`modal__submit-button ${
                isButtonActive ? "modal__submit-button--active" : ""
              }`}
              type="submit"
              disabled={!isButtonActive}
            >
              {buttonText || "Submit"}
            </button>
            <button
              className="modal__span-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                orModal();
              }}
            >
              {spanText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

