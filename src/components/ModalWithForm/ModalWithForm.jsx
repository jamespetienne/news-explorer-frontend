import "./ModalWithForm.css";
import close from "../../assets/close-modal.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  closeActiveModal,
  orModal,
  onSubmit,
  spanText,
  isButtonActive, 
}) {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__container">
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close">
            <img src={close} alt="close-button" onClick={closeActiveModal} />
          </button>
          {children}
          <div className="modal__login-wrapper">
            <button
              className={`modal__submit-button ${
                isButtonActive ? "modal__submit-button--active" : ""
              }`}
              type="submit"
              disabled={!isButtonActive}
            >
              {buttonText}
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

