import ModalWithForm from "../ModalWithForm/ModalWithForm";

const CompletedModal = ({ isOpen, closeActiveModal, handleLoginModal }) => {
  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      name="completed"
      title="Registration successfully completed"
      buttonText=""
      isOpen={isOpen}
      orModal={handleLoginModal} 
      spanText="Sign in"
    >
    </ModalWithForm>
  );
};

export default CompletedModal;
