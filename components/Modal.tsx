import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, title, children }: Props) => {
  return (
    <>
      {isOpen && (
        <dialog className="modal" open>
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg text-center">{title}</h3>
            <div className="modal-action">
              <form method="dialog">{children}</form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Modal;
