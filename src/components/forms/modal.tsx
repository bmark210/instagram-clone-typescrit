import React, { FC } from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen, title }) => {
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`${
        isOpen ? 'fixed' : 'hidden'
      } z-10 inset-0 h-screen bg-black-faded/60 backdrop-opacity-10 flex items-center justify-center`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-1/3 h-max bg-white rounded-lg shadow-xl"
      >
        <p
          className="font-semibold text-lg text-gray-medium text-center mt-5"
          aria-hidden="true"
        >
          {title}
        </p>
        <div
          className="align-bottom bg-white"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="py-3 overflow-y-auto mx-6">{children}</div>
        </div>
        <p
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="font-semibold bg-white text-gray-medium rounded-lg text-center pb-3"
        >
          Close
        </p>
      </div>
    </div>
  );
};

export default Modal;
